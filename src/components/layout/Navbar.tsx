import { useTranslation } from "react-i18next";
import { Moon, Sun, Globe, Menu, X, ChevronDown, DotIcon } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation, Link } from "react-router-dom";
import { companyData } from "../../data/company";
import { Logo } from "../ui/Logo";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (location.pathname !== "/") return;
      const sections = [
        "home",
        "projects",
        "about",
        "services",
        "forwho",
        "process",
        "testimonials",
        "faq",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = "home";
      for (const section of sections) {
        const element = document.getElementById(
          section === "home" ? "root" : section,
        );
        if (element) {
          const elementTop =
            element.getBoundingClientRect().top + window.scrollY;
          if (elementTop <= scrollPosition) {
            currentSection =
              section === "forwho"
                ? "services"
                : section === "testimonials" || section === "faq"
                  ? "contact"
                  : section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "pl" : "en";
    i18n.changeLanguage(next);
    // Zapamiętaj wybór użytkownika, aby autodetekcja kraju go nie nadpisywała
    try {
      localStorage.setItem("ad-lang", next);
    } catch {
      /* localStorage niedostępny – ignorujemy */
    }
  };

  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.95]);
  const blurValue = useTransform(scrollY, [0, 50], [0, 24]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.15]);

  const navBackground = useMotionTemplate`hsl(var(--background) / ${bgOpacity})`;
  const backdropBlur = useMotionTemplate`blur(${blurValue}px)`;
  const borderColor = useMotionTemplate`hsl(var(--foreground) / ${borderOpacity})`;

  const navLinks = [
    {
      id: "projects",
      label: t("nav.projects"),
      href: "/#projects",
      isDropdown: true,
    },
    { id: "about", label: t("nav.about"), href: "/#about" },
    { id: "services", label: t("nav.services"), href: "/#services" },
    { id: "process", label: t("nav.process"), href: "/#process" },
    { id: "contact", label: t("nav.contact"), href: "/#contact" },
  ];

  const isProjectDetailPage =
    location.pathname.startsWith("/realizacje/") &&
    location.pathname !== "/realizacje" &&
    location.pathname !== "/realizacje/";
  const isDarkHeroContext = isProjectDetailPage && !isScrolled;
  const navTextColor = isDarkHeroContext
    ? "text-white"
    : "text-foreground/90 dark:text-foreground/80";
  const navTextHoverColor = isDarkHeroContext
    ? "hover:text-[#14B8A6]"
    : "hover:text-primary";
  const logoTextColor = isDarkHeroContext
    ? "text-white/90"
    : "text-foreground/80";
  const iconColor = isDarkHeroContext ? "text-white" : "text-foreground/80";
  const iconHoverClass = isDarkHeroContext
    ? "hover:text-[#14B8A6] hover:bg-white/10"
    : "hover:text-primary hover:bg-primary/10";

  return (
    <>
      <motion.header
        style={{
          backgroundColor: mobileMenuOpen
            ? "hsl(var(--background))"
            : isDarkHeroContext
              ? "transparent"
              : navBackground,
          backdropFilter:
            mobileMenuOpen || isDarkHeroContext ? "none" : backdropBlur,
          borderBottomColor:
            mobileMenuOpen || isDarkHeroContext ? "transparent" : borderColor,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
        className="fixed top-0 w-full z-[60] transition-colors duration-300"
      >
        <div className="container max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="cursor-pointer relative z-[60]"
            >
              <Logo textColorClass={logoTextColor} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <div
                key={item.id}
                className="relative py-4"
                onMouseEnter={() =>
                  item.isDropdown && setProjectsDropdownOpen(true)
                }
                onMouseLeave={() =>
                  item.isDropdown && setProjectsDropdownOpen(false)
                }
              >
                <HashLink
                  smooth
                  to={item.href}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 group ${activeSection === item.id && location.pathname === "/" ? "text-primary" : `${navTextColor} ${navTextHoverColor}`}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity duration-300 ${activeSection === item.id && location.pathname === "/" ? "opacity-100 shadow-[0_0_8px_rgba(45,212,191,0.8)]" : "opacity-0 group-hover:opacity-50"}`}
                  />
                  {item.label}
                  {item.isDropdown && (
                    <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
                  )}
                </HashLink>

                {item.isDropdown && (
                  <AnimatePresence>
                    {projectsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-10 left-1/2 -translate-x-1/2 mt-2 w-48 bg-background border border-border/50 rounded-xl shadow-xl overflow-hidden py-2 px-1"
                      >
                        <HashLink
                          smooth
                          to="/#projects"
                          className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-md transition-colors font-medium"
                          onClick={() => setProjectsDropdownOpen(false)}
                        >
                          {t("nav.projects")}
                        </HashLink>
                        <Link
                          to="/realizacje"
                          className="block px-4 py-2 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-md transition-colors font-medium"
                          onClick={() => setProjectsDropdownOpen(false)}
                        >
                          {t("nav.allProjects")}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer ${iconColor} ${iconHoverClass} ${isDarkHeroContext ? "" : "hover:shadow-[0_0_5px_rgba(45,212,191,0.2)]"}`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${iconColor} ${iconHoverClass} ${isDarkHeroContext ? "" : "hover:shadow-[0_0_5px_rgba(45,212,191,0.2)]"}`}
            >
              <Globe className="w-4 h-4" />
              <span>{i18n.language.toUpperCase()}</span>
            </button>
            <HashLink
              smooth
              to="/#contact"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {t("nav.freeQuote")}
            </HashLink>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center relative z-[60]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 -mr-2 transition-colors focus:outline-none ${iconColor} ${navTextHoverColor}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background pt-24 pb-6 px-6 flex flex-col md:hidden overflow-y-auto no-scrollbar"
          >
            <nav className="flex flex-col gap-6 mb-auto">
              {navLinks.map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <HashLink
                    smooth
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 text-2xl font-bold tracking-tight transition-colors ${activeSection === item.id && location.pathname === "/" ? "text-primary" : "text-foreground hover:text-primary"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-primary transition-opacity duration-300 ${activeSection === item.id && location.pathname === "/" ? "opacity-100 shadow-[0_0_8px_rgba(45,212,191,0.8)]" : "opacity-0"}`}
                    />
                    {item.label}
                  </HashLink>
                  {item.isDropdown && (
                    <div className="flex flex-col gap-3 pl-8">
                      <Link
                        to="/realizacje"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {t("nav.allProjects")}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex flex-col gap-6 mt-12">
              <div className="flex items-center justify-between border-t border-border pt-6">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("nav.appearance")}
                </span>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("nav.language")}
                </span>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                  <span>
                    {i18n.language.toUpperCase() === "EN"
                      ? "English"
                      : "Polski"}
                  </span>
                </button>
              </div>

              <HashLink
                smooth
                to="/#contact"
                className="inline-flex items-center justify-center w-full mt-4 h-14 bg-primary rounded-xl text-primary-foreground hover:bg-primary/90 font-semibold text-lg shadow-lg shadow-primary/20"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {t("nav.freeQuote")}
              </HashLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
