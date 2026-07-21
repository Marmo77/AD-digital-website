import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, TrendingDown } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const VALUE = { min: 100, max: 5000, step: 50, default: 400 };
const CLIENTS = { min: 1, max: 30, step: 1, default: 5 };

type SliderRowProps = {
  id: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
};

function SliderRow({ id, label, value, display, min, max, step, onChange }: SliderRowProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <label htmlFor={id} className="text-sm text-muted-foreground leading-snug">
          {label}
        </label>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground tabular-nums shrink-0">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                   [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-background
                   [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(45,212,191,0.5)] [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${fill}%, hsl(var(--secondary)) ${fill}%, hsl(var(--secondary)) 100%)`,
        }}
      />
    </div>
  );
}

export function LossCalculator() {
  const { t, i18n } = useTranslation();

  // Liczby podaje sam użytkownik, więc niczego nie zmyślamy
  const [clientValue, setClientValue] = useState(VALUE.default);
  const [lostClients, setLostClients] = useState(CLIENTS.default);

  const monthly = clientValue * lostClients;
  const daily = Math.round(monthly / 30);

  const locale = i18n.language === "en" ? "en-US" : "pl-PL";
  const currency = i18n.language === "en" ? "PLN" : "zł";
  const money = (n: number) => `${new Intl.NumberFormat(locale).format(n)} ${currency}`;

  // Eskalacja w czasie działa mocniej niż pojedyncza kwota
  const periods = [
    { key: "month", amount: monthly },
    { key: "quarter", amount: monthly * 3 },
    { key: "year", amount: monthly * 12 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl border border-primary/30 bg-background p-8 md:p-10 shadow-[0_20px_50px_rgba(45,212,191,0.12)] overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold tracking-widest text-primary uppercase font-mono">
            {t("problem.calculator.badge")}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          {t("problem.calculator.title")}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          {t("problem.calculator.intro")}
        </p>

        {/* Dwa suwaki: wartość klienta i skala utraty */}
        <div className="flex flex-col gap-7 mb-9">
          <SliderRow
            id="clientValue"
            label={t("problem.calculator.valueLabel")}
            value={clientValue}
            display={money(clientValue)}
            min={VALUE.min}
            max={VALUE.max}
            step={VALUE.step}
            onChange={setClientValue}
          />
          <SliderRow
            id="lostClients"
            label={t("problem.calculator.clientsLabel")}
            value={lostClients}
            display={`${lostClients} ${t("problem.calculator.clientsUnit")}`}
            min={CLIENTS.min}
            max={CLIENTS.max}
            step={CLIENTS.step}
            onChange={setLostClients}
          />
        </div>

        {/* Wynik jako narastająca oś czasu */}
        <div className="border-t border-border/50 pt-7">
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-5">
            {t("problem.calculator.resultLabel")}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {periods.map((p, idx) => (
              <div
                key={p.key}
                className={`rounded-2xl px-3 py-4 text-center transition-colors ${
                  idx === periods.length - 1
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-secondary/40"
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                  {t(`problem.calculator.periods.${p.key}`)}
                </p>
                <p
                  className={`font-black tracking-tighter tabular-nums leading-none ${
                    idx === periods.length - 1
                      ? "text-2xl md:text-3xl text-primary"
                      : "text-lg md:text-xl text-foreground/80"
                  }`}
                >
                  {money(p.amount)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
            {t("problem.calculator.dailyNote", { amount: money(daily) })}
          </p>
        </div>

        <HashLink
          smooth
          to="/#contact"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_8px_30px_rgba(45,212,191,0.45)] group"
        >
          {t("problem.calculator.cta")}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </HashLink>

        <p className="text-center text-xs text-muted-foreground/80 mt-4">
          {t("problem.calculator.disclaimer")}
        </p>
      </div>
    </motion.div>
  );
}
