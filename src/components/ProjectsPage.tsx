import { Helmet } from "react-helmet-async";
import { companyData } from "../data/company";
import { projectsData } from "../data/projects";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProjectImage } from "./ui/ProjectImage";

export function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 w-full relative z-10 pt-32 pb-24 text-foreground bg-background">
      <Helmet>
        <title>ADdigital: Realizacje | Tworzenie Stron Internetowych Szczecin</title>
      </Helmet>

      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold tracking-widest text-primary uppercase mb-4"
          >
            {t("projectsPage.badge")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            {t("projectsPage.title")}
            <span className="relative inline-block">
              <span className="text-primary font-black ml-1 relative z-10 px-1">
                {t("projectsPage.titleHighlight")}
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" />
            </span>{" "}
            {t("projectsPage.titleEnd")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            {t("projectsPage.subtitle")}
          </motion.p>
        </div>

        {/* Naprzemienne rzędy: treść i podgląd */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projectsData.map((project, index) => {
            const title = t(`projectsData.${project.id}.title`);
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                {/* Treść */}
                <div className={`flex flex-col gap-5 ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full border border-border/60 bg-secondary/30 text-[11px] font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
                    <span className="text-muted-foreground">
                      {t(`projectsData.${project.id}.category`)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-primary">
                      {t(`projectsData.${project.id}.highlight`)}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    <Link
                      to={`/realizacje/${project.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {title}
                    </Link>
                  </h2>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t(`projectsData.${project.id}.description`)}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <Link
                      to={`/realizacje/${project.id}`}
                      className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_4px_14px_rgba(45,212,191,0.25)] hover:shadow-[0_6px_20px_rgba(45,212,191,0.4)] group"
                    >
                      {t("projectsPage.viewProject")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {t("projectsPage.websiteOnline")}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Podgląd: gif -> image -> fallback */}
                <Link
                  to={`/realizacje/${project.id}`}
                  className={`block rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-500 group ${
                    isReversed ? "lg:order-1" : ""
                  }`}
                >
                  <ProjectImage
                    src={project.gif || project.image}
                    fallbacks={[project.image]}
                    alt={title}
                    className="w-full h-auto object-cover aspect-16/10 transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
