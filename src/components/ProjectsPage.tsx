import { Helmet } from "react-helmet-async";
import { companyData } from "../data/company";
import { projectsData } from "../data/projects";
import { motion } from "framer-motion";
import BlobCursor from "./ui/blob-cursor";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
            {t("projectsPage.title")} <span className="relative inline-block"><span className="text-primary font-black ml-1 relative z-10 px-1">{t("projectsPage.titleHighlight")}</span><span className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-2 rounded-sm" /></span> {t("projectsPage.titleEnd")}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-16">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-6"
            >
              {/* Image Container */}
              <Link to={`/realizacje/${project.id}`} className="block w-[95%] lg:w-[90%] mx-auto aspect-3/2 rounded-[2.5rem] overflow-hidden bg-muted relative transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="w-full h-full pointer-events-auto">
                    <BlobCursor
                      blobType="circle"
                      fillColor="#14B8A6"
                      opacities={[0.3, 0.2, 0.1]}
                      sizes={[80, 150, 100]}
                    />
                  </div>
                </div>

                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"

                />

                <div className="absolute inset-0 z-20 pointer-events-none bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </Link>

              {/* Content */}
              <div className="flex flex-col gap-3 px-2 w-[95%] lg:w-[90%] mx-auto">
                <Link to={`/realizacje/${project.id}`}>
                  <h3 className="text-3xl font-bold tracking-tight text-foreground transition-colors hover:text-primary">
                    {project.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
                  <span className="text-muted-foreground">{project.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-primary">{project.highlight}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-3 w-full">
                  <Link
                    to={`/realizacje/${project.id}`}
                    className="flex justify-center items-center px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_14px_rgba(45,212,191,0.25)] hover:shadow-[0_6px_20px_rgba(45,212,191,0.4)] w-full sm:flex-1"
                  >
                    {t("projectsPage.viewProject")}
                  </Link>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center px-6 py-3.5 rounded-full border border-border/60 font-bold text-sm text-foreground hover:bg-muted hover:border-border transition-all duration-300 w-full sm:flex-1"
                  >
                    {t("projectsPage.websiteOnline")}
                    <ArrowUpRight className="w-4 h-4 ml-1.5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
