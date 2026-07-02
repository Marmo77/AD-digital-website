import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorSmartphone, LayoutTemplate, Search, Rocket, PenTool, TrendingUp } from "lucide-react";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

export function Services() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");

  const rawList = t("services.list", { returnObjects: true }) as ServiceItem[];
  
  const configMap: Record<string, { icon: any, categoryId: string }> = {
    "landing_page": { icon: LayoutTemplate, categoryId: "web" },
    "cms": { icon: MonitorSmartphone, categoryId: "web" },
    "seo": { icon: Search, categoryId: "marketing" },
    "webapp": { icon: Rocket, categoryId: "apps" },
    "redesign": { icon: PenTool, categoryId: "optimization" },
    "marketing": { icon: TrendingUp, categoryId: "marketing" },
  };

  const services = rawList.map(item => ({
    ...item,
    ...(configMap[item.id] || { icon: MonitorSmartphone, categoryId: "web" })
  }));

  const filteredServices = activeTab === "all" ? services : services.filter(s => s.categoryId === activeTab);

  return (
    <section id="services" className="py-32 bg-[#F8FAFC] dark:bg-background/50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-16 md:items-center md:text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary uppercase mb-2"
          >
            {t("services.badge")}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight"
          >
            {t("services.title")}
            <span className="relative inline-block mx-1">
              <span className="text-primary font-black relative z-10 px-1">{t("services.titleHighlight")}</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" />
            </span>
            {t("services.titleEnd")}
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg md:text-xl text-muted-foreground font-serif max-w-3xl mt-2"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>


        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-background border border-border/40 p-8 rounded-3xl transition-all duration-500 group flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(45,212,191,0.15)] hover:border-primary/50 relative overflow-hidden"
                >
                  <div className="absolute top-12 right-6 opacity-5 transform group-hover:scale-110 group-hover:-translate-x-2 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                      <Icon className="w-32 h-32 text-primary dark:text-muted-foreground" />
                  </div>

                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm relative z-10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow relative z-10">
                    {service.description}
                  </p>
                  
                  {/* Badges / Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {service.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary/50 text-foreground/80 text-[11px] font-mono rounded-full border border-border/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center flex flex-col items-center justify-center gap-6"
        >
          <div className="w-16 h-[1px] bg-border/50"></div>
          <p className="text-muted-foreground font-medium">{t("services.contactPrompt")}</p>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{t("services.contactButton")}</span>
            <svg 
              className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
