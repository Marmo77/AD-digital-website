import { useTranslation } from "react-i18next";
import { companyData } from "../../data/company";
import {
  Github,
  Instagram,
  Facebook,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const copyFooterArr = t("footer.copy").split(" ");
  const restrict = copyFooterArr.slice(0, 3).join(" ");
  const projectDesignFront = copyFooterArr.slice(3, 6).join(" ");
  const projectDesignAuthor = copyFooterArr.splice(6);

  return (
    <footer className="w-full border-t border-primary/20 bg-background/50 backdrop-blur-sm py-16 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo />
          <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left mt-2">
            {t("footer.description")}
          </p>
          <a
            href="https://aleksydobrodziej.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            {t("footer.founder")}
            <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-center gap-4">
          <h4 className="font-semibold text-foreground tracking-wide uppercase text-sm">
            {t("footer.shortcuts")}
          </h4>
          <nav className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <HashLink
              smooth
              to="/#projects"
              className="hover:text-primary transition-colors"
            >
              {t("nav.projects")}
            </HashLink>
            <HashLink
              smooth
              to="/#services"
              className="hover:text-primary transition-colors"
            >
              {t("nav.services")}
            </HashLink>
            <HashLink
              smooth
              to="/#about"
              className="hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </HashLink>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacy")}
            </Link>
          </nav>
        </div>

        {/* Info & Hours */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="font-semibold text-foreground tracking-wide uppercase text-sm">
            {t("footer.info")}
          </h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground items-center md:items-start">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary" />
              <div className="flex flex-col">
                <span>{companyData.location}</span>
                <span className="text-xs opacity-80">
                  {companyData.address}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 mt-0.5 text-primary" />
              <div className="flex flex-col text-xs leading-5">
                {(
                  t("contact.workingHours", { returnObjects: true }) as string[]
                ).map((line, idx) => (
                  <p key={idx} className="text-foreground tracking-tight ">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h4 className="font-semibold text-foreground tracking-wide uppercase text-sm">
            {t("footer.contact")}
          </h4>
          <a
            href={`mailto:${companyData.email}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {companyData.email}
          </a>
          <a
            href={`tel:${companyData.phone.replace(/\s+/g, "")}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {companyData.phone}
          </a>

          <div className="flex items-center gap-4 mt-4">
            <a
              href={companyData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={companyData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={companyData.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-border/40 flex md:flex-row flex-col items-center justify-between text-center gap-2 relative z-10 text-xs text-muted-foreground">
        <div className="flex md:flex-row flex-col gap-2">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {companyData.name}.
          </p>
          <span>{restrict}</span>
        </div>
        <div className="flex gap-2">
          <span>{projectDesignFront}</span>
          <a
            href="https://aleksydobrodziej.com"
            target="_blank"
            className="font-semibold text-primary/80 cursor-pointer hover:underline underline-offset-3"
          >
            {projectDesignAuthor}
          </a>
        </div>
      </div>
    </footer>
  );
}
