import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import Orb from "../ui/orb";
import ShinyText from "../ui/shiny-text";
import { HashLink } from "react-router-hash-link";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-transparent">
      {/* Backgrounds - React Bits Style Orb */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-80 mt-8 md:mt-32">
        <div className="w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] max-w-[800px] max-h-[800px] -translate-y-[15%] lg:-translate-y-[20%]">
          <Orb hue={120} hoverIntensity={0.2} rotateOnHover={true} backgroundColor="transparent" forceHoverState={false} />
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center pb-20 pt-24 md:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-tight py-2 mb-6 max-w-5xl"
        >
          {t("hero.title")}
          <div className="mt-2 pb-2 block">
            <ShinyText 
              text={t("hero.titleHighlight")} 
              className="text-primary font-bold tracking-tighter" 
            />
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg text-muted-foreground font-serif leading-relaxed mb-8"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <HashLink smooth to="/#contact" className="inline-flex justify-center items-center h-14 px-8 text-base rounded-md font-medium shadow-[0_4px_20px_rgba(45,212,191,0.2)] dark:shadow-[0_4px_20px_rgba(45,212,191,0.1)] bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_30px_rgba(45,212,191,0.4)] transition-all duration-300 w-full sm:w-auto overflow-hidden group">
            <span className="relative z-10 flex items-center">
              {t("hero.ctaPrimary")}
              <ArrowDown className="w-5 h-5 ml-2 transition-all duration-300 ease-in-out group-hover:rotate-0 -rotate-90 group-hover:animate-bounce origin-center" />
            </span>
          </HashLink>
          <HashLink smooth to="/#projects" className="inline-flex justify-center items-center h-14 px-8 text-base font-semibold rounded-md text-foreground/80 border border-transparent hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out w-full sm:w-auto group">
            <span className="relative z-10 flex items-center">
              {t("hero.ctaSecondary")}
              <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out" />
            </span>
          </HashLink>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5, delay: 0.8 }}
         className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group w-full px-6 z-10 hidden sm:flex"
      >
        <HashLink smooth to="/#projects" className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center w-full max-w-[200px] opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="flex-1 h-[1px] border-t border-dashed border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
              <span className="px-4 text-xs text-muted-foreground uppercase tracking-[0.2em] font-semibold font-sans group-hover:text-primary transition-colors">
                {t("hero.scroll")}
              </span>
              <div className="flex-1 h-[1px] border-t border-dashed border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
            </motion.div>
        </HashLink>
      </motion.div>

      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1.5, delay: 0.8 }}
         className="relative mt-20 pt-8 pb-4 flex flex-col items-center gap-3 cursor-pointer group w-full px-6 z-10 sm:hidden"
      >
        <HashLink smooth to="/#projects" className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center w-full max-w-[200px] opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="flex-1 h-[1px] border-t border-dashed border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
              <span className="px-4 text-xs text-muted-foreground uppercase tracking-[0.2em] font-semibold font-sans group-hover:text-primary transition-colors">
                {t("hero.scroll")}
              </span>
              <div className="flex-1 h-[1px] border-t border-dashed border-muted-foreground/50 group-hover:border-primary/50 transition-colors" />
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors" />
            </motion.div>
        </HashLink>
      </motion.div>
    </section>
  );
}
