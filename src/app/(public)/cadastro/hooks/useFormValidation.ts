"use client";

import { useState, useCallback } from "react";
import type {
  SignupFormData,
  ValidationErrors,
  FormStep,
} from "@cadastro/types";

function validateField(
  fieldName: keyof SignupFormData,
  value: unknown,
  formData: SignupFormData,
): string | undefined {
  switch (fieldName) {
    case "fullName":
      if (typeof value !== "string" || value.trim().length < 3) {
        return "";
      }
      if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
        return "Nome deve conter apenas letras";
      }
      return undefined;

    case "nickname":
      if (typeof value !== "string" || value.trim().length < 3) {
        return "Nickname deve ter pelo menos 3 caracteres";
      }
      if (value.length > 20) {
        return "Nickname deve ter no máximo 20 caracteres";
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return "Nickname deve conter apenas letras, números e underscore";
      }
      return undefined;

    case "email":
      if (typeof value !== "string" || !value) {
        return "Email é obrigatório";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Formato de email inválido";
      }
      return undefined;

    case "phone":
      // Campo opcional - apenas valida se preenchido
      if (typeof value === "string" && value.trim() !== "") {
        // Remove caracteres não numéricos para validação
        const numbersOnly = value.replace(/\D/g, "");

        // Valida se tem entre 10 e 11 dígitos (DDD + número)
        if (numbersOnly.length < 10 || numbersOnly.length > 11) {
          return "Telefone deve ter 10 ou 11 dígitos";
        }
      }
      return undefined;

    case "password":
      if (typeof value !== "string" || value.length < 6) {
        return "Senha deve ter pelo menos 6 caracteres";
      }
      if (value.length > 50) {
        return "Senha deve ter no máximo 50 caracteres";
      }
      if (!/[A-Z]/.test(value)) {
        return "Senha deve conter pelo menos uma letra maiúscula";
      }
      if (!/[a-z]/.test(value)) {
        return "Senha deve conter pelo menos uma letra minúscula";
      }
      if (!/[0-9]/.test(value)) {
        return "Senha deve conter pelo menos um número";
      }
      return undefined;

    case "confirmPassword":
      if (value !== formData.password) {
        return "As senhas não coincidem";
      }
      return undefined;

    case "platform":
      if (!value || value === "") {
        return "Selecione uma plataforma";
      }
      return undefined;

    case "genres":
      if (!Array.isArray(value) || value.length === 0) {
        return "Selecione pelo menos um gênero";
      }
      if (value.length > 3) {
        return "Selecione no máximo 3 gêneros";
      }
      return undefined;

    case "acceptTerms":
      if (value !== true) {
        return "Você deve aceitar os termos de uso";
      }
      return undefined;

    case "message":
      return undefined;

    default:
      return undefined;
  }
}

function validateStep(
  step: FormStep,
  formData: SignupFormData,
): ValidationErrors {
  const errors: ValidationErrors = {};

  switch (step) {
    case 1: // informaçoes pessoais
      errors.fullName = validateField("fullName", formData.fullName, formData);
      errors.nickname = validateField("nickname", formData.nickname, formData);
      errors.email = validateField("email", formData.email, formData);
      errors.phone = validateField("phone", formData.phone, formData);
      break;

    case 2: // password
      errors.password = validateField("password", formData.password, formData);
      errors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword,
        formData,
      );
      break;

    case 3: // preferencias
      errors.platform = validateField("platform", formData.platform, formData);
      errors.genres = validateField("genres", formData.genres, formData);
      break;

    case 4: // finalizando
      errors.message = validateField("message", formData.message, formData);
      errors.acceptTerms = validateField(
        "acceptTerms",
        formData.acceptTerms,
        formData,
      );
      break;

    default:
      break;
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([_, v]) => v !== undefined),
  ) as ValidationErrors;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateSingleField = useCallback(
    (
      fieldName: keyof SignupFormData,
      value: unknown,
      formData: SignupFormData,
    ) => {
      const error = validateField(fieldName, value, formData);
      setErrors((prev) => {
        if (error) {
          return { ...prev, [fieldName]: error };
        } else {
          const { [fieldName]: _, ...rest } = prev;
          return rest;
        }
      });
      return error;
    },
    [],
  );

  const validateCurrentStep = useCallback(
    (step: FormStep, formData: SignupFormData): boolean => {
      const stepErrors = validateStep(step, formData);
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    },
    [],
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateSingleField,
    validateCurrentStep,
    clearErrors,
  };
}
