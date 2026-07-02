import { useTranslation } from "react-i18next";
import { Check, X, ShieldCheck, HeartHandshake, AlertTriangle, Activity } from "lucide-react";
import { motion } from "framer-motion";

const goodFitPoints = [
  {
    title: "Strona ma zarabiać",
    description: "Traktujesz WWW jako narzędzie sprzedażowe. Oczekujesz zwrotu z inwestycji i profesjonalnego wizerunku w sieci.",
    icon: Activity,
    number: "1."
  },
  {
    title: "Partnerstwo biznesowe",
    description: "Szukasz partnera, a nie \"wykonawcy\". Masz czas na krótką rozmowę, by wspólnie nakreślić strategię.",
    icon: HeartHandshake,
    number: "2."
  },
  {
    title: "Inwestycja w jakość",
    description: "Rozumiesz, że dobra aplikacja kosztuje, ale dzięki szybkości i użyteczności, zarabia na siebie.",
    icon: ShieldCheck,
    number: "3."
  }
];

const badFitPoints = [
  {
    title: "A najtaniej to ile?",
    description: "Zależy Ci tylko na tym, by znaleźć najtańszą opcję na rynku za 500 zł, bez względu na jakość i sprzedaż.",
    icon: X,
    number: "1."
  },
  {
    title: "Projekt \"na wczoraj\"",
    description: "Oczekujesz natychmiastowych efektów \"od ręki\". Nie masz czasu na wstępną analizę swojej firmy.",
    icon: AlertTriangle,
    number: "2."
  },
  {
    title: "Strona \"tylko żeby była\"",
    description: "Nie interesuje Cię pozyskiwanie nowych klientów z internetu. Szukasz po prostu martwej wizytówki.",
    icon: X,
    number: "3."
  }
];

export function ForWho() {
  const { t } = useTranslation();
  
  const goodFitPoints = t("forWho.goodFit", { returnObjects: true }) as Array<{title: string, description: string, number: string}>;
  const badFitPoints = t("forWho.badFit", { returnObjects: true }) as Array<{title: string, description: string, number: string}>;

  return (
    <section id="forwho" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 overflow-hidden">
      <div className="text-center mb-20 relative z-10">
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
          className="text-4xl md:text-5xl lg:text-5xl font-heading font-bold tracking-tight mb-6 text-foreground"
        >
          {t("forWho.heading")} <span className="text-primary">{t("forWho.headingHighlight")}</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          {t("forWho.desc")}
        </motion.p>
      </div>

      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 md:gap-8 relative z-10">
        
        {/* GREEN CONTAINER */}
        <div className="relative flex justify-center md:justify-end pr-0 md:pr-4">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col relative w-full items-center md:items-end gap-6 md:gap-0">
            
            {/* Box 1 (Top) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-10 w-full max-w-[320px] bg-background border border-primary/30 p-6 rounded-2xl shadow-xl hover:border-primary/80 transition-colors md:mr-0 group"
            >
              <div className="flex gap-4 items-start">
                <span className="text-4xl font-bold font-mono text-primary/20 group-hover:text-primary/40 transition-colors">{goodFitPoints[0].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{goodFitPoints[0].title}</h4>
                  <p className="text-sm text-muted-foreground">{goodFitPoints[0].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Box 2 (Middle) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10 w-full max-w-[320px] bg-background border border-primary/30 p-6 rounded-2xl shadow-xl hover:border-primary/80 transition-colors md:mt-10 md:mr-8 group"
            >
              <div className="hidden md:block absolute -top-10 right-14 h-10 border-r-2 border-dashed border-primary/40 transition-colors" />
              
              <div className="flex gap-4 items-start">
                <span className="text-4xl font-bold font-mono text-primary/20 group-hover:text-primary/40 transition-colors">{goodFitPoints[1].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{goodFitPoints[1].title}</h4>
                  <p className="text-sm text-muted-foreground">{goodFitPoints[1].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Box 3 (Bottom) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative z-10 w-full max-w-[320px] bg-background border border-primary/30 p-6 rounded-2xl shadow-xl hover:border-primary/80 transition-colors md:mt-10 md:mr-16 group"
            >
              <div className="hidden md:block absolute -top-10 right-14 h-10 border-r-2 border-dashed border-primary/40 transition-colors" />

              <div className="flex gap-4 items-start">
                <span className="text-4xl font-bold font-mono text-primary/20 group-hover:text-primary/40 transition-colors">{goodFitPoints[2].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{goodFitPoints[2].title}</h4>
                  <p className="text-sm text-muted-foreground">{goodFitPoints[2].description}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* RED CONTAINER */}
        <div className="relative flex justify-center md:justify-start pl-0 md:pl-4">
          <div className="absolute inset-0 bg-destructive/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col relative w-full items-center md:items-start gap-6 md:gap-0">
            
            {/* Box 1 (Top) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative z-10 w-full max-w-[320px] bg-background/50 backdrop-blur-sm border border-destructive/20 p-6 rounded-2xl hover:border-destructive/40 transition-colors ml-0 group"
            >
              <div className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl font-bold font-mono text-destructive/20 group-hover:text-destructive/40 transition-colors">{badFitPoints[0].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{badFitPoints[0].title}</h4>
                  <p className="text-sm text-muted-foreground">{badFitPoints[0].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Box 2 (Middle) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-10 w-full max-w-[320px] bg-background/50 backdrop-blur-sm border border-destructive/20 p-6 rounded-2xl hover:border-destructive/40 transition-colors md:mt-10 md:ml-8 group"
            >
              <div className="hidden md:block absolute -top-10 left-10 h-10 border-l-2 border-dashed border-destructive/30 transition-colors" />

              <div className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl font-bold font-mono text-destructive/20 group-hover:text-destructive/40 transition-colors">{badFitPoints[1].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{badFitPoints[1].title}</h4>
                  <p className="text-sm text-muted-foreground">{badFitPoints[1].description}</p>
                </div>
              </div>
            </motion.div>

            {/* Box 3 (Bottom) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-10 w-full max-w-[320px] bg-background/50 backdrop-blur-sm border border-destructive/20 p-6 rounded-2xl hover:border-destructive/40 transition-colors md:mt-10 md:ml-16 group"
            >
              <div className="hidden md:block absolute -top-10 left-10 h-10 border-l-2 border-dashed border-destructive/30 transition-colors" />

              <div className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-4xl font-bold font-mono text-destructive/20 group-hover:text-destructive/40 transition-colors">{badFitPoints[2].number}</span>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">{badFitPoints[2].title}</h4>
                  <p className="text-sm text-muted-foreground">{badFitPoints[2].description}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
