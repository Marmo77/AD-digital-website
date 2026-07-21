import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

type FitPoint = { title: string; description: string; number: string };

type FitPanelProps = {
  variant: "good" | "bad";
  label: string;
  points: FitPoint[];
};

function FitPanel({ variant, label, points }: FitPanelProps) {
  const isGood = variant === "good";
  const Icon = isGood ? Check : X;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: isGood ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[2rem] border overflow-hidden ${
        isGood
          ? "border-primary/30 bg-primary/[0.03] shadow-[0_20px_60px_rgba(45,212,191,0.1)]"
          : "border-border/60 bg-secondary/20"
      }`}
    >
      {/* Poświata tylko po dobrej stronie, żeby wzrok szedł tam pierwszy */}
      {isGood && (
        <div className="absolute -top-32 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[110px] pointer-events-none" />
      )}

      <div className="relative z-10 p-7 md:p-9">
        {/* Nagłówek panelu */}
        <div className="flex items-center gap-3 pb-6 mb-2 border-b border-border/50">
          <span
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isGood ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={3} />
          </span>
          <h3
            className={`text-sm md:text-base font-bold tracking-tight ${
              isGood ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </h3>
        </div>

        {/* Punkty */}
        <ul className="flex flex-col">
          {points.map((point, idx) => (
            <li
              key={idx}
              className="group relative flex gap-5 py-6 border-b border-border/40 last:border-b-0 transition-transform duration-300 hover:translate-x-1"
            >
              {/* Akcent rosnący przy najechaniu */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-2/3 transition-all duration-300 rounded-full ${
                  isGood ? "bg-primary" : "bg-muted-foreground/40"
                }`}
              />

              <span
                className={`text-4xl md:text-5xl font-black font-mono leading-none tabular-nums shrink-0 transition-colors duration-300 pl-3 ${
                  isGood
                    ? "text-primary/25 group-hover:text-primary"
                    : "text-muted-foreground/20 group-hover:text-muted-foreground/50"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h4
                  className={`text-lg font-bold tracking-tight mb-1.5 transition-colors ${
                    isGood
                      ? "text-foreground group-hover:text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {point.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ForWho() {
  const { t } = useTranslation();

  const goodFitPoints = t("forWho.goodFit", { returnObjects: true }) as FitPoint[];
  const badFitPoints = t("forWho.badFit", { returnObjects: true }) as FitPoint[];

  return (
    <section
      id="forwho"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="text-center mb-16 md:mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block font-mono"
        >
          {t("forWho.subtitle")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground"
        >
          {t("forWho.heading")}
          <span className="relative inline-block">
            <span className="text-primary font-black relative z-10 px-1">
              {t("forWho.headingHighlight")}
            </span>
            <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mx-auto text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          {t("forWho.desc")}
        </motion.p>
      </div>

      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-6 lg:gap-8 items-start relative z-10">
        <FitPanel
          variant="good"
          label={t("forWho.goodFitTitle")}
          points={Array.isArray(goodFitPoints) ? goodFitPoints : []}
        />
        <FitPanel
          variant="bad"
          label={t("forWho.badFitTitle")}
          points={Array.isArray(badFitPoints) ? badFitPoints : []}
        />
      </div>
    </section>
  );
}
