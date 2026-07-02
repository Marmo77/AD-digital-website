import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";
import { BadgeCustom } from "../ui/badge-custom";

export function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: "Michał Kowalski",
      role: "CEO, TechStart",
      text: "Współpraca z tym studiem to czysta przyjemność. Nasz ruch organiczny wzrósł o 150% w ciągu kwartału, a nowa strona to prawdziwe mistrzostwo minimalizmu.",
    },
    {
      id: 2,
      name: "Anna Nowak",
      role: "Founder, Bloom Boutique",
      text: "Niesamowite wyczucie estetyki! Moja marka nabrała zupełnie nowego, ekskluzywnego charakteru. Polecam każdemu, kto szuka jakości.",
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      role: "Marketing Director",
      text: "Profesjonalizm i perfekcyjna komunikacja. Optymalizacja wizytówki Google przyniosła nam klientów z dnia na dzień. Świetna robota.",
    }
  ];

  return (
    <section className="py-32 bg-transparent">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 mb-20 items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <BadgeCustom>{t("testimonials.badge")}</BadgeCustom>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-serif max-w-2xl"
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={testi.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full flex flex-col justify-between p-4 bg-background hover:shadow-[0_8px_30px_rgba(167,243,208,0.15)] dark:hover:shadow-[0_8px_30px_rgba(52,211,153,0.05)] border-transparent hover:border-primary/30 transition-all duration-500 rounded-2xl group">
                <CardContent className="pt-6 relative">
                  <div className="text-6xl text-primary/10 absolute top-4 right-6 font-serif leading-none italic group-hover:text-primary/20 transition-colors duration-500 hover:scale-110">"</div>
                  <div className="flex gap-1 mb-8 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground/90 leading-relaxed font-serif text-lg mb-12 relative z-10">
                    {testi.text}
                  </p>
                  <div>
                    <p className="font-semibold text-foreground text-lg tracking-tight">{testi.name}</p>
                    <p className="text-sm text-primary font-medium tracking-wide uppercase mt-1">{testi.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
