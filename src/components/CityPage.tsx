import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { MapPin, Check, ArrowRight, ArrowUpRight } from "lucide-react";
import { companyData } from "../data/company";
import { citiesData, getCityBySlug } from "../data/cities";
import { projectsData } from "../data/projects";
import { ProjectImage } from "./ui/ProjectImage";

export function CityPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();

  const city = getCityBySlug(slug);
  if (!city) {
    return <Navigate to="/" replace />;
  }

  const key = `cities.${city.id}`;
  const name = t(`${key}.name`);
  const title = t(`${key}.title`);
  const lead = t(`${key}.lead`);
  const paragraphs = t(`${key}.paragraphs`, { returnObjects: true }) as string[];
  const localNote = t(`${key}.localNote`);

  const project = projectsData.find((p) => p.id === city.featuredProjectId);
  const otherCities = citiesData.filter((c) => c.id !== city.id);

  // Filary oferty wykorzystujemy ponownie, zamiast pisać osobną listę usług
  const pillars = t("services.pillars", { returnObjects: true }) as Array<{
    id: string;
    title: string;
    tagline: string;
    description: string;
  }>;

  const pageUrl = `${companyData.url}/${city.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      serviceType: "Tworzenie stron internetowych i pozycjonowanie",
      url: pageUrl,
      inLanguage: i18n.language,
      provider: {
        "@type": "ProfessionalService",
        name: companyData.name,
        url: companyData.url,
        email: companyData.email,
        telephone: companyData.phone,
      },
      areaServed: { "@type": "City", name },
      description: t(`${key}.metaDescription`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: companyData.name, item: companyData.url },
        { "@type": "ListItem", position: 2, name: title, item: pageUrl },
      ],
    },
  ];

  return (
    <main className="flex-1 w-full bg-background relative z-10">
      <Helmet>
        <title>{t(`${key}.metaTitle`)}</title>
        <meta name="description" content={t(`${key}.metaDescription`)} />
        <meta property="og:title" content={t(`${key}.metaTitle`)} />
        <meta property="og:description" content={t(`${key}.metaDescription`)} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="container max-w-6xl mx-auto px-6 pt-28 md:pt-32 pb-24">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase font-mono mb-5">
            <MapPin className="w-4 h-4" />
            {t("cityPage.badge")}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{title}</h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{lead}</p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <HashLink
              smooth
              to="/#contact"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(45,212,191,0.3)] group"
            >
              {t("cityPage.ctaButton")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </HashLink>
            <Link
              to="/realizacje"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              {t("nav.projects")}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Treść lokalna */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-16 md:mt-20">
          <div className="lg:col-span-7 flex flex-col gap-5">
            {(Array.isArray(paragraphs) ? paragraphs : []).map((para, idx) => (
              <p key={idx} className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
            <p className="text-base font-semibold text-foreground mt-2">{localNote}</p>
          </div>

          {/* Usługi w tym rejonie */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-border/50 bg-secondary/20 p-7">
              <h2 className="text-lg font-bold tracking-tight mb-6">
                {t("cityPage.servicesTitle")}
              </h2>
              <ul className="flex flex-col gap-5">
                {(Array.isArray(pillars) ? pillars : []).map((pillar) => (
                  <li key={pillar.id} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{pillar.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Dowód: realizacja z okolicy */}
        {project && (
          <section className="mt-20">
            <p className="text-xs font-bold tracking-widest uppercase text-primary font-mono mb-6">
              {t("cityPage.proofTitle")}
            </p>
            <Link
              to={`/realizacje/${project.id}`}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-3xl border border-border/50 overflow-hidden hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="overflow-hidden bg-muted">
                <ProjectImage
                  src={project.gif || project.image}
                  fallbacks={[project.image, project.imageFallback]}
                  alt={t(`projectsData.${project.id}.title`)}
                  className="w-full h-auto object-cover aspect-16/10 transition-transform duration-[1.2s] group-hover:scale-105"
                />
              </div>
              <div className="p-7 md:pr-9">
                <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                  {t(`projectsData.${project.id}.category`)}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-3 group-hover:text-primary transition-colors">
                  {t(`projectsData.${project.id}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t(`projectsData.${project.id}.description`)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {t("cityPage.proofCta")}
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* CTA */}
        <section className="mt-20 rounded-3xl border border-primary/30 bg-primary/[0.04] p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {t("cityPage.ctaTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              {t("cityPage.ctaText")}
            </p>
          </div>
          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(45,212,191,0.3)] shrink-0 group"
          >
            {t("cityPage.ctaButton")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </HashLink>
        </section>

        {/* Pozostałe miasta: wewnętrzne linkowanie */}
        <nav className="mt-14 pt-10 border-t border-border/50">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground font-mono mb-5">
            {t("cityPage.otherCities")}
          </p>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((other) => (
              <Link
                key={other.id}
                to={`/${other.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-border/60 text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              >
                <MapPin className="w-4 h-4" />
                {t(`cities.${other.id}.name`)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
