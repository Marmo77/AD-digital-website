import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import { X, Check, TrendingDown, ArrowDown } from "lucide-react";
import { LossCalculator } from "./LossCalculator";

type Stat = {
  value: string;
  label: string;
  note: string;
};

export function Problem() {
  const { t } = useTranslation();

  const stats = t("problem.stats", { returnObjects: true }) as Stat[];
  const without = t("problem.without", { returnObjects: true }) as string[];
  const with_ = t("problem.with", { returnObjects: true }) as string[];

  return (
    <section id="problem" className="py-24 md:py-32 relative z-10">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Nagłówek */}
        <div className="flex flex-col gap-4 mb-14 items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary uppercase"
          >
            {t("problem.badge")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl"
          >
            {t("problem.title")}
            <span className="relative inline-block">
              <span className="text-primary font-black relative z-10 px-1">
                {t("problem.titleHighlight")}
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" />
            </span>
            {t("problem.titleEnd")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-serif max-w-3xl leading-relaxed mt-2"
          >
            {/* Wyróżnienia siedzą w tłumaczeniach, więc obie wersje językowe są spójne */}
            <Trans
              i18nKey="problem.subtitle"
              components={{
                b: <strong className="font-bold text-foreground" />,
                u: (
                  <span className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4" />
                ),
                i: <em className="italic text-foreground/90" />,
              }}
            />
          </motion.p>
        </div>

        {/* Kalkulator + kontrast obok siebie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <LossCalculator />

          <div className="flex flex-col gap-6">
            {/* Bez widoczności */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-destructive/20 bg-destructive/[0.03] p-7 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {t("problem.withoutTitle")}
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {without.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-destructive" />
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Z widocznością */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-7 md:p-8 shadow-[0_8px_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                  {t("problem.withTitle")}
                </h3>
              </div>
              <ul className="flex flex-col gap-4">
                {with_.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Lekki pasek statystyk zamiast osobnych kart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 pt-10 border-t border-border/50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-baseline gap-3">
                <span className="text-3xl font-black tracking-tighter text-primary shrink-0 tabular-nums">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-6">{t("problem.statsSource")}</p>
        </motion.div>

        {/* Przejście do oferty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center text-center gap-5 mt-16"
        >
          <p className="text-lg md:text-xl font-semibold tracking-tight text-foreground max-w-2xl">
            {t("problem.conclusion")}
          </p>
          <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
