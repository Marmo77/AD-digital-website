import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ExternalLink, ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { companyData } from "../data/company";
import { projectsData } from "../data/projects";
import { ProjectImage } from "./ui/ProjectImage";

type Feature = { title: string; description: string };

export function ProjectSchema() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const index = projectsData.findIndex((p) => p.id === id);
  const project = index >= 0 ? projectsData[index] : undefined;

  if (!project) {
    return <Navigate to="/realizacje" replace />;
  }

  // Sąsiednie realizacje (zapętlone), żeby nawigacja na dole zawsze działała
  const prev = projectsData[(index - 1 + projectsData.length) % projectsData.length];
  const next = projectsData[(index + 1) % projectsData.length];

  const key = `projectsData.${project.id}`;
  const title = t(`${key}.title`);
  const category = t(`${key}.category`);
  const highlight = t(`${key}.highlight`);
  const description = t(`${key}.description`);
  const client = t(`${key}.client`);
  const overviewTitle = t(`${key}.overviewTitle`);
  const overview = t(`${key}.overview`, { returnObjects: true }) as string[];
  const features = t(`${key}.features`, { returnObjects: true }) as Feature[];
  const results = t(`${key}.results`, { returnObjects: true }) as string[];

  const pageTitle = `${title} | ${t("nav.projects")} | ${companyData.name}`;
  const pageUrl = `${companyData.url}/realizacje/${project.id}`;
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : `${companyData.url}${project.image}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      headline: title,
      description,
      url: pageUrl,
      image: imageUrl,
      inLanguage: i18n.language,
      genre: category,
      keywords: [category, ...project.tech].join(", "),
      about: client,
      creator: { "@type": "Organization", name: companyData.name, url: companyData.url },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: companyData.name, item: companyData.url },
        { "@type": "ListItem", position: 2, name: t("nav.projects"), item: `${companyData.url}/realizacje` },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl },
      ],
    },
  ];

  return (
    <main className="flex-1 w-full bg-background relative z-10">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${title} | ${companyData.name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-24">
        {/* Powrót */}
        <Link
          to="/realizacje"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("projectDetail.back")}
        </Link>

        {/* Nagłówek realizacji */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 mb-12"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              {category}
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {highlight}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_8px_30px_rgba(45,212,191,0.45)]"
            >
              {t("projectDetail.viewOnline")}
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-12 px-5 rounded-xl border border-border/60 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              {project.url}
            </a>
          </div>
        </motion.div>

        {/* Podgląd: gif -> image -> fallback */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden border border-border/50 bg-muted shadow-[0_20px_60px_rgba(0,0,0,0.12)] mb-16 md:mb-20"
        >
          <ProjectImage
            src={project.gif || project.image}
            fallbacks={[project.image]}
            alt={title}
            className="w-full h-auto object-cover aspect-16/9"
          />
        </motion.div>

        {/* Treść + panel boczny */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Lewa kolumna */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-primary font-mono mb-4">
                {t("projectDetail.overview")}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                {overviewTitle}
              </h2>
              <div className="flex flex-col gap-4">
                {(Array.isArray(overview) ? overview : []).map((para, idx) => (
                  <p key={idx} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {Array.isArray(features) && features.length > 0 && (
              <section>
                <p className="text-xs font-bold tracking-widest uppercase text-primary font-mono mb-6">
                  {t("projectDetail.features")}
                </p>
                <ul className="flex flex-col gap-5">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                      </span>
                      <p className="text-base md:text-lg leading-relaxed">
                        <span className="font-bold text-foreground">{feature.title}</span>
                        <span className="text-muted-foreground"> {feature.description}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {Array.isArray(results) && results.length > 0 && (
              <section>
                <p className="text-xs font-bold tracking-widest uppercase text-primary font-mono mb-6">
                  {t("projectDetail.results")}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((result, idx) => (
                    <li
                      key={idx}
                      className="rounded-2xl border border-border/50 bg-secondary/20 px-5 py-4 text-sm md:text-base font-medium text-foreground/90 leading-snug"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Panel boczny */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6 rounded-3xl border border-border/50 bg-secondary/20 p-7">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground font-mono mb-3">
                  {t("projectDetail.clientLabel")}
                </p>
                <p className="text-base font-semibold text-foreground leading-snug">{client}</p>
              </div>

              <div className="border-t border-border/50 pt-6">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground font-mono mb-3">
                  {t("projectDetail.industry")}
                </p>
                <p className="text-base font-semibold text-foreground">{category}</p>
              </div>

              <div className="border-t border-border/50 pt-6">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground font-mono mb-3">
                  {t("projectDetail.tech")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-background border border-border/60 text-[11px] font-mono text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-border/50 pt-6">
                <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground font-mono mb-3">
                  {t("projectDetail.links")}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  {project.url}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-primary/30 bg-primary/[0.04] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {t("projectDetail.ctaTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              {t("projectDetail.ctaText")}
            </p>
          </div>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(45,212,191,0.3)] shrink-0 group"
          >
            {t("projectDetail.ctaButton")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </HashLink>
        </div>

        {/* Nawigacja między realizacjami */}
        <nav className="mt-14 pt-10 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/realizacje/${prev.id}`}
            className="group flex items-center gap-3 rounded-2xl border border-border/50 p-5 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all shrink-0" />
            <span className="min-w-0">
              <span className="block text-xs font-bold tracking-widest uppercase text-muted-foreground">
                {t("projectDetail.prev")}
              </span>
              <span className="block font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {t(`projectsData.${prev.id}.title`)}
              </span>
            </span>
          </Link>

          <Link
            to={`/realizacje/${next.id}`}
            className="group flex items-center justify-end gap-3 rounded-2xl border border-border/50 p-5 hover:border-primary/50 hover:bg-primary/5 transition-all text-right"
          >
            <span className="min-w-0">
              <span className="block text-xs font-bold tracking-widest uppercase text-muted-foreground">
                {t("projectDetail.next")}
              </span>
              <span className="block font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {t(`projectsData.${next.id}.title`)}
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </nav>
      </div>
    </main>
  );
}
