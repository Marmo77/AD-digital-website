import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import BlobCursor from "../ui/blob-cursor";
import { Link } from "react-router-dom";
import { projectsData } from "../../data/projects";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-12 mb-24">
          {projectsData.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group outline-none flex flex-col gap-5"
            >
              {/* Image Container with precise styling from design */}
              <Link to={`/realizacje/${project.id}`} className="block w-[96%] lg:w-[92%] mx-auto aspect-3/2 rounded-[2.5rem] overflow-hidden bg-muted relative transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
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

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 rounded-inherit backdrop-blur-[2px] [mask-image:radial-gradient(circle,transparent_45%,black_100%)] bg-black/15" />
                <div className="absolute inset-0 z-20 pointer-events-none bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </Link>

              {/* Content matching screenshot */}
              <div className="flex flex-col gap-2 px-1 w-[96%] lg:w-[92%] mx-auto">
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
                {/* Optional short description */}
                <Link to={`/realizacje/${project.id}`} className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed max-w-[90%] hover:text-foreground/80 transition-colors">
                  {project.description}
                </Link>
              </div>
            </motion.div>
          ))}
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
