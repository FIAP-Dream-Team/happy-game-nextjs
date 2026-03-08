"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  SignupFormData,
  FormStep,
  Genre,
  Platform,
  ValidationErrors,
} from "@cadastro/types";
import { useFormValidation } from "@cadastro/hooks/useFormValidation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { H2, Paragraph } from "@/components/ui/Typography";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Lock,
  Gamepad2,
  FileText,
} from "lucide-react";

const INITIAL_FORM_DATA: SignupFormData = {
  fullName: "",
  nickname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  platform: "",
  genres: [],
  message: "",
  acceptTerms: false,
};

export function SignupForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, validateSingleField, validateCurrentStep, clearErrors } =
    useFormValidation();

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean | Platform | "",
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateSingleField(field, value, { ...formData, [field]: value });
  };

  const handleGenreToggle = (genre: Genre) => {
    const newGenres = formData.genres.includes(genre)
      ? formData.genres.filter((g) => g !== genre)
      : [...formData.genres, genre];

    setFormData((prev) => ({ ...prev, genres: newGenres }));
    validateSingleField("genres", newGenres, {
      ...formData,
      genres: newGenres,
    });
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep, formData)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4) as FormStep);
      clearErrors();
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as FormStep);
    clearErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep(4, formData)) {
      return;
    }

    setIsSubmitting(true);

    // Store user data in sessionStorage for feedback page
    const feedbackData = {
      fullName: formData.fullName,
      platform: formData.platform,
      genres: formData.genres,
    };
    sessionStorage.setItem("userFeedbackData", JSON.stringify(feedbackData));

    // Simulate loading
    setTimeout(() => {
      // Redirect to feedback page
      router.push("/feedback");
    }, 1000);
  };

  //steps do form
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <Step2Password
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <Step3Preferences
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onGenreToggle={handleGenreToggle}
          />
        );
      case 4:
        return (
          <Step4Finalization
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  // Render step icon
  const getStepIcon = (step: FormStep) => {
    switch (step) {
      case 1:
        return <User className="h-5 w-5" />;
      case 2:
        return <Lock className="h-5 w-5" />;
      case 3:
        return <Gamepad2 className="h-5 w-5" />;
      case 4:
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Render step title
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Informações Pessoais";
      case 2:
        return "Crie sua Senha";
      case 3:
        return "Preferências de Jogos";
      case 4:
        return "Finalização";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`
                  // Layout
                  flex items-center justify-center
                  // Size
                  w-12 h-12
                  // Border & Background
                  rounded-full border-2
                  // Transitions
                  transition-all duration-300
                  ${
                    currentStep >= step
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background-secondary text-text-muted"
                  }
                `}
              >
                {currentStep > step ? (
                  <Check className="h-5 w-5" />
                ) : (
                  getStepIcon(step as FormStep)
                )}
              </div>
              {step < 4 && (
                <div
                  className={`
                    absolute
                    h-0.5 w-[calc(25%-3rem)]
                    top-6
                    transition-colors duration-300
                    ${currentStep > step ? "bg-primary" : "bg-border"}
                  `}
                  style={{ left: `calc(${step * 25}% - 1.5rem)` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <H2 className="mb-2">{getStepTitle()}</H2>
        <Paragraph className="text-text-muted">
          Etapa {currentStep} de 4
        </Paragraph>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-fadeIn">{renderStepContent()}</div>

        <div className="flex gap-4 pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} className="flex-1">
              Próximo
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              <Check className="h-4 w-4 mr-2" />
              {isSubmitting ? "Finalizando..." : "Finalizar Cadastro"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

// Step Components

interface StepProps {
  formData: SignupFormData;
  errors: ValidationErrors;
  onChange: (
    field: keyof SignupFormData,
    value: string | boolean | Platform | "",
  ) => void;
}

function Step1PersonalInfo({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo *</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <Paragraph variant="text3" className="text-destructive">
              {errors.fullName}
            </Paragraph>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname">Nickname *</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="Como você será chamado..."
            value={formData.nickname}
            onChange={(e) => onChange("nickname", e.target.value)}
            className={errors.nickname ? "border-destructive" : ""}
          />
          {errors.nickname && (
            <Paragraph variant="text3" className="text-destructive">
              {errors.nickname}
            </Paragraph>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <Paragraph variant="text3" className="text-destructive">
              {errors.email}
            </Paragraph>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone (Opcional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(99) 99999-9999"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <Paragraph variant="text3" className="text-destructive">
              {errors.phone}
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
}

function Step2Password({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Senha *</Label>
        <Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <Paragraph variant="text3" className="text-destructive">
            {errors.password}
          </Paragraph>
        )}
        <Paragraph variant="text4" className="text-text-muted">
          Mínimo 6 caracteres com pelo menos uma maiúscula, uma minúscula e um
          número
        </Paragraph>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          value={formData.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && (
          <Paragraph variant="text3" className="text-destructive">
            {errors.confirmPassword}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

interface Step3Props extends StepProps {
  onGenreToggle: (genre: Genre) => void;
}

function Step3Preferences({
  formData,
  errors,
  onChange,
  onGenreToggle,
}: Step3Props) {
  const genres: { value: Genre; label: string }[] = [
    { value: "rpg", label: "RPG" },
    { value: "indie", label: "Indie" },
    { value: "fps", label: "FPS" },
    { value: "sports", label: "Esportes" },
    { value: "moba", label: "MOBA" },
    { value: "other", label: "Outro" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="platform">Plataforma Favorita *</Label>
        <Select
          value={formData.platform}
          onValueChange={(value) => onChange("platform", value as Platform)}
        >
          <SelectTrigger
            className={errors.platform ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Selecione sua plataforma..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pc">PC</SelectItem>
            <SelectItem value="console">Console</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="retro">Retro</SelectItem>
          </SelectContent>
        </Select>
        {errors.platform && (
          <Paragraph variant="text3" className="text-destructive">
            {errors.platform}
          </Paragraph>
        )}
      </div>

      <div className="space-y-3">
        <Label>Gêneros Favoritos * (máximo 3)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {genres.map((genre) => (
            <div key={genre.value} className="flex items-center space-x-2">
              <Checkbox
                id={genre.value}
                checked={formData.genres.includes(genre.value)}
                onCheckedChange={() => onGenreToggle(genre.value)}
                disabled={
                  formData.genres.length >= 3 &&
                  !formData.genres.includes(genre.value)
                }
              />
              <Label
                htmlFor={genre.value}
                className="font-normal cursor-pointer"
              >
                {genre.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.genres && (
          <Paragraph variant="text3" className="text-destructive">
            {errors.genres}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

function Step4Finalization({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">
          Conte sua ideia, dúvida ou sugestão (Opcional)
        </Label>
        <Textarea
          id="message"
          placeholder="Compartilhe seus pensamentos sobre jogos, sugestões ou dúvidas..."
          value={formData.message}
          onChange={(e) => onChange("message", e.target.value)}
          rows={6}
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            onChange("acceptTerms", checked as boolean)
          }
          className={errors.acceptTerms ? "border-destructive" : ""}
        />
        <Label
          htmlFor="terms"
          className="font-normal cursor-pointer leading-relaxed"
        >
          Li e aceito os{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de uso
          </a>{" "}
          do Happy Game *
        </Label>
      </div>
      {errors.acceptTerms && (
        <Paragraph variant="text3" className="text-destructive ml-6">
          {errors.acceptTerms}
        </Paragraph>
      )}
    </div>
  );
}
