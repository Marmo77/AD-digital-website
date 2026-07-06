import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ExternalLink, ChevronLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { companyData } from "../data/company";
import { projectsData } from "../data/projects";
import { ProjectImage } from "./ui/ProjectImage";

export function ProjectSchema() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/realizacje" replace />;
  }

  return (
    <main className="flex-1 w-full bg-background relative z-10">
      <Helmet>
        <title>{project.title} | Realizacje | {companyData.name}</title>
      </Helmet>

      {/* Hero Banner (Screen 1 style) */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center mb-10 md:mb-20">
        <div className="absolute inset-0 z-0">
          <ProjectImage src={project.backgroundImage || project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0f172a]/80" /> {/* Dark slate overlay */}
        </div>

        <div className="absolute top-0 left-0 w-full h-full pt-28 pointer-events-none">
          <div className="container max-w-7xl mx-auto px-6 h-full relative">
            <div className="pointer-events-auto inline-block">
              <Link
                to="/realizacje"
                className="inline-flex items-center text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                WRÓĆ DO REALIZACJI
              </Link>
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center translate-y-8">
          <span className="text-[#14B8A6] font-bold tracking-widest text-xs lg:text-sm uppercase mb-4 block">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h1>
          {project.client && (
            <p className="text-slate-300 text-lg md:text-xl font-light">
              Projekt dla klienta: <span className="text-white font-medium">{project.client}</span>
            </p>
          )}
        </div>
      </div>

      {/* Content Section (Screen 2 style) */}
      <div className="container max-w-6xl mx-auto px-6 mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 lg:gap-16 pb-16 border-b border-border/40">
          <div className="max-w-2xl flex flex-col justify-start">
            <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase mb-6">
              <span className="text-muted-foreground">{project.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[#14B8A6]">{project.highlight}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center md:pb-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-2 text-lg shadow-[0_10px_20px_rgba(20,184,166,0.2)] hover:shadow-[0_10px_30px_rgba(20,184,166,0.4)] hover:-translate-y-1"
            >
              Zobacz stronę online <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Minimalist Grid for Wyzwanie / Rozwiązanie / Efekty */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-16">
          <div className="lg:col-span-8 flex flex-col gap-16">
            {project.challenge && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Wyzwanie</h3>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Rozwiązanie</h3>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90">{project.solution}</p>
              </div>
            )}
          </div>

          {/* Efekty */}
          <div className="lg:col-span-4 lg:pl-10">
            {project.results && project.results.length > 0 && (
              <div className="flex flex-col h-full pt-2 lg:pt-0">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-6 text-muted-foreground border-b border-border/50 pb-4">
                  Główne efekty
                </h3>
                <ul className="flex flex-col gap-5">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="text-[#14B8A6] font-bold mt-1 opacity-80">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-base font-medium leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
