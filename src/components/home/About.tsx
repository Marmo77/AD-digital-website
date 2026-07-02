import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { MapPin, ShieldCheck, Zap } from "lucide-react";
import { RotatingText } from "../ui/rotating-text";
import { LogoLoop } from "../ui/LogoLoop";
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiVite, 
  SiVercel, 
  SiGit, 
  SiGithub, 
  SiSupabase, 
  SiNextdotjs, 
  SiStripe 
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiVite />, title: "Vite" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiStripe />, title: "Stripe" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
];

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 relative text-foreground">
      {/* Gradient mask to smoothly hide dots behind this section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-transparent z-[-1]" />
      
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="text-sm font-semibold tracking-wider text-primary uppercase">
              {t("about.badge")}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight flex flex-wrap gap-x-3">
              <span className="text-foreground">{t("about.title")}</span>
              <RotatingText 
                words={t("about.titleHighlight", { returnObjects: true }) as string[]} 
                className="text-primary font-black relative underline decoration-primary decoration-[4px] underline-offset-8" 
              />
            </h2>
            
            <h3 className="text-xl md:text-2xl text-foreground font-serif leading-relaxed mt-2">
              {t("about.subtitle")}
            </h3>
            
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed mt-4">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
            </div>

            <Button 
                size="lg" 
                className="w-fit mt-8 h-14 px-8 text-base shadow-[0_4px_14px_rgba(45,212,191,0.2)] hover:scale-105 transition-transform"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t("about.cta")}
            </Button>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <div className="flex flex-col gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02, backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-secondary/30 border border-border/50 rounded-2xl p-6 flex gap-6 items-start cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 shrink-0 bg-background border border-border/50 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{t("about.features.location.title")}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.features.location.description")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02, backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-secondary/30 border border-border/50 rounded-2xl p-6 flex gap-6 items-start ml-0 lg:ml-8 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 shrink-0 bg-background border border-border/50 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{t("about.features.quality.title")}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.features.quality.description")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02, backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-secondary/30 border border-border/50 rounded-2xl p-6 flex gap-6 items-start ml-0 lg:ml-16 cursor-pointer transition-colors group"
            >
              <div className="w-12 h-12 shrink-0 bg-background border border-border/50 rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{t("about.features.approach.title")}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.features.approach.description")}</p>
              </div>
            </motion.div>
          </div>
          
        </div>

        {/* Technologies Section */}
        <div className="mt-32 border-t border-border/50 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">
              {t("technologies.badge")}
            </h3>
            <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t("technologies.title")}
            </h4>
          </div>
          <LogoLoop logos={techLogos} speed={30} direction="left" />
        </div>
      </div>
    </section>
  );
}
