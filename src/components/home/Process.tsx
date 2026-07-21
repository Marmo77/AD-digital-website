import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useRef } from "react";
import { SpotlightCard } from "../ui/SpotlightCard";

const REFINED_PROCESS = [
  {
    phase: "01 / KONSULTACJA",
    title: "Analiza i cele",
    desc: "Zaczynamy od niezobowiązującej rozmowy - na żywo lub online. Dokładnie analizuję Twoją branżę, działania konkurencji oraz oczekiwania Twoich klientów. Wspólnie definiujemy cele biznesowe, które ma realizować nowa strona. To solidny fundament, bez którego nie ruszamy z pracą.",
    tags: ["Analiza Rynku", "Brief Biznesowy", "Cele Projektu"],
    colorHex: "rgba(45, 212, 191, 0.15)", // Tailwind teal-400
    visual: () => (
      <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Radar background circles */}
        <div className="absolute w-24 h-24 rounded-full border border-primary/20" />
        <div className="absolute w-40 h-40 rounded-full border border-primary/10" />
        <div className="absolute w-56 h-56 rounded-full border border-border/50" />
        
        {/* Radar sweep */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 origin-bottom-right bottom-1/2 right-1/2 border-r-2 border-primary/50"
          style={{
            background: "conic-gradient(from 90deg at 100% 100%, transparent 0deg, transparent 270deg, rgba(45, 212, 191, 0.4) 360deg)"
          }}
        />
        
        {/* Center dot */}
        <div className="relative z-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
        
        {/* Blips */}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 1] }}
          className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(45,212,191,0.8)]"
        />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 4, delay: 1.5, repeat: Infinity, times: [0, 0.1, 1] }}
          className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(45,212,191,0.8)]"
        />
      </div>
    )
  },
  {
    phase: "02 / PROJEKTOWANIE",
    title: "Koncepcja i makiety",
    desc: "Przekuwam nasze ustalenia w pierwsze wizualizacje, zanim jeszcze napiszę linijkę kodu. Krok po kroku tłumaczę Ci zaproponowane rozwiązania i sprawdzam, czy wpisują się w Twoją wizję. Na tym etapie wspólnie dyskutujemy i wprowadzamy poprawki, aż projekt będzie w 100% zgodny z Twoimi oczekiwaniami.",
    tags: ["Makiety Wizualne", "Konsultacje", "Wdrażanie Poprawek"],
    colorHex: "rgba(45, 212, 191, 0.15)",
    visual: () => (
      <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none perspective-[1000px]">
        <div className="relative w-36 h-28 preserve-3d group">
           {/* Abstract Floating Cards */}
           {[0, 1, 2].map((i) => (
             <motion.div
               key={i}
               initial={{ rotateX: 60, rotateZ: -20, y: i * -12 }}
               animate={{ 
                 rotateX: 60, 
                 rotateZ: -20, 
                 y: [i * -12, (i * -12) - 4, i * -12],
               }}
               transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-primary/60 via-primary/10 to-transparent shadow-xl overflow-hidden"
               style={{ zIndex: 10 - i }}
             >
                <div className="w-full h-full bg-background/95 backdrop-blur-md rounded-[11px] overflow-hidden">
                  {i === 2 && (
                    <div className="w-full h-full p-3 opacity-50 flex flex-col justify-end">
                       <div className="w-full h-3 rounded bg-foreground/10 mb-2" />
                       <div className="flex gap-2 h-10 mb-2">
                          <div className="w-1/3 h-full rounded bg-foreground/5" />
                          <div className="w-2/3 h-full rounded bg-primary/20" />
                       </div>
                       <div className="w-1/2 h-2 rounded bg-foreground/5" />
                    </div>
                  )}
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    )
  },
  {
    phase: "03 / FORMALNOŚCI",
    title: "Wycena i Start",
    desc: "Zapewniam zero ukrytych kosztów. Otrzymujesz ode mnie klarowny kosztorys oraz dokładny harmonogram prac. Aby zabezpieczyć proces i zarezerwować mój czas dla Ciebie, startujemy z programowaniem natychmiast po wpłaceniu zaliczki startowej (50% kwoty).",
    tags: ["Przejrzystość", "Harmonogram", "Umowa"],
    colorHex: "rgba(45, 212, 191, 0.15)",
    visual: () => (
      <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Base circle background */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" className="text-foreground/5" />
            
            {/* Animated filling circle */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="44" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="276.5"
              animate={{ strokeDashoffset: [276.5, 138.25, 138.25, 0, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.5, 0.7, 1] }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="flex flex-col items-center justify-center relative z-10 text-center w-full h-full">
            <motion.div 
              animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 0.8, 0.8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.5, 0.6, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-2xl font-bold text-primary">50%</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase mt-0.5">Start</span>
            </motion.div>
            <motion.div 
              animate={{ opacity: [0, 0, 0, 1, 1], scale: [0.8, 0.8, 0.8, 1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 0.6, 0.7, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-2xl font-bold text-primary">100%</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase mt-0.5">Finał</span>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    phase: "04 / PROGRAMOWANIE",
    title: "Transparentny rozwój",
    desc: "Otrzymujesz dostęp w czasie rzeczywistym do ukrytego linku podglądowego. Koduję stronę wykorzystując najnowsze technologie (m.in. React i Vite), pozostając z Tobą w ciągłym kontakcie. Dzięki temu na bieżąco widzisz, jak Twój projekt ożywa i nabiera kształtów w internecie.",
    tags: ["Live Preview", "Czysty Kod", "Bieżący Feedback"],
    colorHex: "rgba(45, 212, 191, 0.15)",
    visual: () => (
      <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none overflow-hidden p-4">
        <div className="w-full max-w-[200px] h-32 rounded-lg bg-card/80 border border-border/80 flex flex-col overflow-hidden shadow-xl backdrop-blur-sm">
          <div className="h-6 bg-foreground/5 border-b border-border/50 flex items-center px-2 gap-1.5">
             <div className="w-2 h-2 rounded-full bg-rose-400" />
             <div className="w-2 h-2 rounded-full bg-amber-400" />
             <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="p-3 font-mono text-[9px] sm:text-[10px] leading-relaxed">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-primary mb-1 font-semibold"
            >
              ~$ npm run build
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}
              className="text-foreground/70 flex flex-col gap-0.5"
            >
              <div><span className="text-emerald-500">✓</span> compiling resources...</div>
              <div><span className="text-emerald-500">✓</span> building modules...</div>
              <div className="text-amber-500">! optimizing chunks...</div>
              <div className="flex gap-1 items-center mt-1">
                <span className="w-1.5 h-3 bg-foreground/80 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    phase: "05 / WDROŻENIE",
    title: "Publikacja i Wsparcie",
    desc: "Gdy w pełni zaakceptujesz wygląd i działanie strony, a formalności finansowe zostaną dopięte, publikuję gotowy produkt na niezawodnych serwerach. Moja rola jednak się tu nie kończy. Pozostaję do Twojej dyspozycji - pomagam w obsłudze, wdrażam ewentualne poprawki i jestem gotowy na dalszą rozbudowę strony w przyszłości.",
    tags: ["Publikacja w Sieci", "Wsparcie Techniczne", "Rozwój Projektu"],
    colorHex: "rgba(45, 212, 191, 0.15)",
    visual: () => (
      <div className="relative w-full h-full min-h-[160px] flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Server rack */}
        <div className="absolute right-8 md:right-12 w-16 h-20 rounded-lg bg-card border border-border flex flex-col gap-1 p-1.5 z-10 shadow-xl backdrop-blur-sm">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex-1 rounded bg-foreground/5 border border-foreground/5 relative overflow-hidden flex items-center px-1 gap-1">
                 <motion.div 
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                   className="w-1 h-1 rounded-full bg-primary"
                 />
                 <div className="w-4 h-0.5 bg-foreground/10 rounded-full" />
             </div>
           ))}
        </div>
        
        {/* Flying page */}
        <motion.div 
          initial={{ x: -80, y: 0, opacity: 0, rotate: -15, scale: 0.8 }}
          animate={{ 
            x: [ -80, -20, 25 ], 
            y: [ 0, -10, 5 ], 
            opacity: [0, 1, 0],
            rotate: [-15, 0, 10],
            scale: [0.8, 1, 0.4]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeIn" }}
          className="absolute w-12 h-16 bg-background border border-primary/30 rounded shadow-lg p-1.5 flex flex-col gap-1 z-20"
        >
           <div className="w-full h-1 bg-foreground/20 rounded-full" />
           <div className="w-2/3 h-1 bg-foreground/20 rounded-full" />
           <div className="w-full h-1.5 bg-primary/40 rounded-full mt-1" />
           <div className="w-1/2 h-1 bg-foreground/20 rounded-full" />
        </motion.div>
        
        {/* Data stream trail */}
        <motion.div
          animate={{ strokeDashoffset: [40, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-10 left-4 md:left-8 opacity-50 z-0"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
             <path 
               d="M 10 20 C 40 10, 60 30, 90 20" 
               fill="none" 
               stroke="rgba(45, 212, 191, 0.3)" 
               strokeWidth="2" 
               strokeDasharray="4 8" 
             />
          </svg>
        </motion.div>
      </div>
    )
  }
];

export function Process() {
  const { t } = useTranslation();
  const processSteps = t("process.steps", { returnObjects: true }) as Array<{phase: string, title: string, desc: string, tags: string[]}>;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 mb-12" ref={containerRef}>
      
      <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary uppercase mb-4"
          >
            {t("nav.process")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto mb-6"
          >
            {t("process.title")} <span className="text-foreground/50 font-light">{t("process.titleLight")} <span className="relative inline-block ml-1"><span className="text-primary font-black relative z-10 px-1">{t("process.titleHighlight")}</span><span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" /></span></span>
          </motion.h2>
      </div>

      <div className="space-y-6 relative z-10">
        {REFINED_PROCESS.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} 
            className="w-full"
          >
            <SpotlightCard 
              spotlightColor={step.colorHex} 
              className="w-full group !p-0"
            >
              <div className="flex flex-col md:flex-row w-full h-full">
                {/* Text Side */}
                <div className="py-10 px-6 md:py-14 md:px-10 flex-1 md:w-3/5 md:border-r border-b md:border-b-0 border-border/50 z-10 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-[10px] md:text-xs font-mono tracking-widest text-primary font-semibold">
                       {processSteps[i]?.phase || step.phase}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-sans font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-500">
                    {processSteps[i]?.title || step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-500">
                    {processSteps[i]?.desc || step.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {(processSteps[i]?.tags || step.tags).map((tag, tagIdx) => (
                      <div 
                        key={tagIdx} 
                        className="px-3 py-1 rounded-full border border-border bg-background/50 text-muted-foreground text-[10px] md:text-xs font-medium cursor-default group-hover:border-primary/20 transition-colors duration-300"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Abstract Visual Side */}
                <div className="py-12 px-6 md:py-14 md:px-10 flex-1 md:w-2/5 flex items-center justify-center relative overflow-hidden bg-background/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
                  <step.visual />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
