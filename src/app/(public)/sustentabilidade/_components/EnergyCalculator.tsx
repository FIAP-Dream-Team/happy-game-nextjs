"use client";

import { useState, useId } from "react";
import { Zap, Monitor, Smartphone, Gamepad2, Tv2, Leaf } from "lucide-react";

type Device = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  wattsPerHour: number;
  description: string;
};

const DEVICES: Device[] = [
  {
    id: "pc-gamer",
    label: "PC Gamer",
    icon: Monitor,
    wattsPerHour: 300,
    description: "GPU dedicada, alto consumo",
  },
  {
    id: "console",
    label: "Console (PS5/Xbox)",
    icon: Gamepad2,
    wattsPerHour: 150,
    description: "Consumo moderado",
  },
  {
    id: "smart-tv",
    label: "Smart TV + streaming",
    icon: Tv2,
    wattsPerHour: 90,
    description: "Inclui roteador e servidor",
  },
  {
    id: "mobile",
    label: "Smartphone",
    icon: Smartphone,
    wattsPerHour: 5,
    description: "Menor consumo direto",
  },
];

// Fator de emissão médio do Brasil (kgCO₂/kWh) — Fonte: MAPA/SEEG 2023
const BRAZIL_EMISSION_FACTOR = 0.074;

// Equivalências para contextualizar o impacto
function getEquivalence(kgCO2: number): string {
  if (kgCO2 < 0.1) return `equivale a carregar um smartphone ${Math.round(kgCO2 / 0.008)} vezes`;
  if (kgCO2 < 1) return `equivale a ${Math.round(kgCO2 / 0.21 * 10) / 10} km percorridos de carro`;
  return `equivale a ${Math.round(kgCO2 / 0.021)} sacolas plásticas produzidas`;
}

export function EnergyCalculator() {
  const [selectedDevice, setSelectedDevice] = useState<string>("pc-gamer");
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);

  const hoursInputId = useId();
  const daysInputId = useId();

  const device = DEVICES.find((d) => d.id === selectedDevice) ?? DEVICES[0];
  const weeklyHours = hoursPerDay * daysPerWeek;
  const monthlyHours = weeklyHours * 4.3;
  const yearlyHours = weeklyHours * 52;

  const kWhPerMonth = (device.wattsPerHour * monthlyHours) / 1000;
  const kWhPerYear = (device.wattsPerHour * yearlyHours) / 1000;
  const kgCO2PerMonth = kWhPerMonth * BRAZIL_EMISSION_FACTOR;
  const kgCO2PerYear = kWhPerYear * BRAZIL_EMISSION_FACTOR;

  const costPerKwh = 0.85; // R$/kWh — média residencial Brasil 2024
  const monthlyCost = kWhPerMonth * costPerKwh;

  return (
    <section
      aria-labelledby="calculator-title"
      className="rounded-2xl border border-border-primary bg-surface-neutral p-6 md:p-8 space-y-8"
    >
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Zap className="h-6 w-6 text-text-highlight-purple" aria-hidden />
          <h2
            id="calculator-title"
            className="font-heading text-xl font-bold text-text-primary"
          >
            Simulador de Impacto Digital
          </h2>
        </div>
        <p className="text-text-tertiary text-sm">
          Calcule o consumo energético e a pegada de carbono do seu hábito de
          gaming com base no mix elétrico brasileiro.
        </p>
      </header>

      {/* Seleção de dispositivo */}
      <fieldset>
        <legend className="text-sm font-semibold text-text-secondary mb-3">
          Selecione seu dispositivo principal
        </legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEVICES.map((d) => {
            const DeviceIcon = d.icon;
            const isSelected = selectedDevice === d.id;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedDevice(d.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors cursor-pointer text-center focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-action-primary-default bg-action-primary-default/10 text-text-highlight-purple"
                    : "border-border-primary hover:border-border-secondary text-text-tertiary"
                }`}
              >
                <DeviceIcon
                  className="h-8 w-8"
                  aria-hidden
                />
                <span className="text-xs font-semibold leading-tight">
                  {d.label}
                </span>
                <span className="text-xs opacity-70">{d.wattsPerHour}W</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor={hoursInputId}
            className="text-sm font-semibold text-text-secondary flex justify-between"
          >
            <span>Horas por dia</span>
            <span className="text-text-highlight-purple font-bold">
              {hoursPerDay}h
            </span>
          </label>
          <input
            id={hoursInputId}
            type="range"
            min={1}
            max={16}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full accent-action-primary-default cursor-pointer"
            aria-valuetext={`${hoursPerDay} horas por dia`}
          />
          <div className="flex justify-between text-xs text-text-tertiary">
            <span>1h</span>
            <span>16h</span>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor={daysInputId}
            className="text-sm font-semibold text-text-secondary flex justify-between"
          >
            <span>Dias por semana</span>
            <span className="text-text-highlight-purple font-bold">
              {daysPerWeek}d
            </span>
          </label>
          <input
            id={daysInputId}
            type="range"
            min={1}
            max={7}
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
            className="w-full accent-action-primary-default cursor-pointer"
            aria-valuetext={`${daysPerWeek} dias por semana`}
          />
          <div className="flex justify-between text-xs text-text-tertiary">
            <span>1 dia</span>
            <span>7 dias</span>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div
        aria-live="polite"
        aria-atomic="true"
        aria-label="Resultado do cálculo de impacto"
      >
        <h3 className="text-sm font-semibold text-text-secondary mb-3">
          Seu impacto estimado
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ResultCard
            label="Consumo mensal"
            value={`${kWhPerMonth.toFixed(1)} kWh`}
            sub={`R$ ${monthlyCost.toFixed(2)}/mês`}
            color="purple"
          />
          <ResultCard
            label="CO₂ por mês"
            value={`${kgCO2PerMonth.toFixed(2)} kg`}
            sub={getEquivalence(kgCO2PerMonth)}
            color="green"
          />
          <ResultCard
            label="Consumo anual"
            value={`${kWhPerYear.toFixed(0)} kWh`}
            sub={`${weeklyHours * 52}h de gaming`}
            color="purple"
          />
          <ResultCard
            label="CO₂ por ano"
            value={`${kgCO2PerYear.toFixed(1)} kg`}
            sub={getEquivalence(kgCO2PerYear)}
            color="green"
          />
        </div>
      </div>

      {/* Dica sustentável */}
      <div className="flex items-start gap-3 bg-surface-success/10 border border-surface-success/30 rounded-xl p-4">
        <Leaf className="h-5 w-5 text-surface-success shrink-0 mt-0.5" aria-hidden />
        <p className="text-sm text-text-secondary">
          <strong>Dica verde:</strong> O Brasil tem uma das matrizes elétricas
          mais limpas do mundo (~83% renovável). Mesmo assim, reduzir o tempo
          de jogo em 30 min por dia economizaria{" "}
          <strong>
            {((device.wattsPerHour * 0.5 * 365) / 1000).toFixed(0)} kWh/ano
          </strong>{" "}
          — energia suficiente para carregar um smartphone por{" "}
          <strong>
            {Math.round((device.wattsPerHour * 0.5 * 365 * 1000) / 8)} dias
          </strong>
          .
        </p>
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: "purple" | "green";
}) {
  return (
    <div className="rounded-xl border border-border-primary p-4 space-y-1">
      <p className="text-xs text-text-tertiary font-medium">{label}</p>
      <p
        className={`text-lg font-bold font-heading ${
          color === "purple" ? "text-text-highlight-purple" : "text-surface-success"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-text-tertiary leading-tight">{sub}</p>
    </div>
  );
}
