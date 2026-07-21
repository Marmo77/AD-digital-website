import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Check, Plus, ArrowRight, Clock } from "lucide-react";
import { HashLink } from "react-router-hash-link";

export function Included() {
  const { t } = useTranslation();

  const always = t("included.always", { returnObjects: true }) as string[];
  const optional = t("included.optional", { returnObjects: true }) as string[];

  return (
    <section id="included" className="py-24 md:py-32 relative z-10 bg-[#F8FAFC] dark:bg-background/50">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Nagłówek */}
        <div className="flex flex-col gap-4 mb-16 items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary uppercase"
          >
            {t("included.badge")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl"
          >
            {t("included.title")}
            <span className="relative inline-block">
              <span className="text-primary font-black relative z-10 px-1">
                {t("included.titleHighlight")}
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" />
            </span>
            {t("included.titleEnd")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-serif max-w-3xl leading-relaxed mt-2"
          >
            {t("included.subtitle")}
          </motion.p>
        </div>

        {/* Dwie kolumny: standard vs opcje */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Zawsze w standardzie */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border-2 border-primary bg-background p-8 md:p-10 shadow-[0_20px_50px_rgba(45,212,191,0.15)]"
          >
            <h3 className="text-2xl font-bold tracking-tight mb-1">
              {t("included.alwaysTitle")}
            </h3>
            <p className="text-sm text-primary font-semibold mb-8">
              {t("included.alwaysSubtitle")}
            </p>

            <ul className="flex flex-col divide-y divide-border/50">
              {always.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-center py-3.5 first:pt-0 last:pb-0">
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                  </span>
                  <span className="text-sm md:text-base text-foreground/90 leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dobierane indywidualnie */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-border/50 bg-white dark:bg-background p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold tracking-tight mb-1">
              {t("included.optionalTitle")}
            </h3>
            <p className="text-sm text-muted-foreground font-semibold mb-8">
              {t("included.optionalSubtitle")}
            </p>

            <ul className="flex flex-col divide-y divide-border/50">
              {optional.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-center py-3.5 first:pt-0 last:pb-0">
                  <span className="w-6 h-6 rounded-full border border-border bg-secondary/50 flex items-center justify-center shrink-0">
                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Subtelne ramowanie straty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/[0.04] px-6 py-5 max-w-4xl mx-auto"
        >
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
            {t("included.fomo")}{" "}
            <span className="font-semibold text-foreground">{t("included.fomoHighlight")}</span>
          </p>
        </motion.div>

        {/* Wycena indywidualna */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("included.note")}
          </p>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_8px_30px_rgba(45,212,191,0.45)] group"
          >
            {t("included.cta")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </HashLink>
        </motion.div>
      </div>
    </section>
  );
}
