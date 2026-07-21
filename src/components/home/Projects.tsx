import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { projectsData } from "../../data/projects";
import { ProjectImage } from "../ui/ProjectImage";

export function Projects() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-32 bg-transparent text-foreground relative z-10" ref={containerRef}>
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4 mb-24 items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-primary uppercase"
          >
            {t("portfolio.badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl"
          >
            {t("portfolio.title")} <span className="relative inline-block"><span className="text-primary font-black ml-1 relative z-10 px-1">{t("portfolio.titleHighlight")}</span><span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" /></span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mt-4 leading-relaxed font-light"
          >
            {t("portfolio.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {projectsData.slice(0, 4).map((project, index) => {
            const title = t(`projectsData.${project.id}.title`);
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col rounded-3xl border border-border/50 bg-white dark:bg-background overflow-hidden hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500"
              >
                {/* Podgląd: gif -> image -> fallback */}
                <Link
                  to={`/realizacje/${project.id}`}
                  className="block overflow-hidden bg-muted relative"
                >
                  <ProjectImage
                    src={project.gif || project.image}
                    fallbacks={[project.image]}
                    alt={title}
                    className="w-full h-auto object-cover aspect-16/10 transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-[11px] font-bold tracking-widest uppercase text-primary">
                    {t(`projectsData.${project.id}.highlight`)}
                  </span>
                </Link>

                <div className="flex flex-col gap-3 p-6 md:p-7 flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full border border-border/60 bg-secondary/30 text-[10px] font-mono text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                    {t(`projectsData.${project.id}.category`)}
                  </span>

                  <Link to={`/realizacje/${project.id}`}>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {t(`projectsData.${project.id}.description`)}
                  </p>

                  <Link
                    to={`/realizacje/${project.id}`}
                    className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors"
                  >
                    {t("projectsPage.viewProject")}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link to="/realizacje" className="group">
            <Button size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all duration-300 ease-in-out cursor-pointer hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]">
              <span className="relative z-10 flex items-center">
                {t("projects.viewMore")}
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-in-out" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
