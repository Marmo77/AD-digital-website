import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "../ui/custom-cursor";
import ScrollToTop from "./ScrollToTop";
import { companyData } from "../../data/company";

export function Layout() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  // Jedno źródło prawdy dla adresu kanonicznego (unika zduplikowanych <link rel="canonical">)
  const canonicalUrl = `${companyData.url}${pathname === "/" ? "/" : pathname}`;

  // Automatyczny język na podstawie kraju (tylko przy 1. wizycie - ręczny wybór ma priorytet).
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem("ad-lang");
    } catch {
      /* localStorage niedostępny */
    }

    // Użytkownik dokonał już wyboru - uszanuj go i nie wykrywaj kraju.
    if (stored) {
      if (stored !== i18n.language) i18n.changeLanguage(stored);
      return;
    }

    let cancelled = false;
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const country = data && data.country;
        // Kraj inny niż Polska (i rozpoznany) -> angielski. Domyślnie zostaje polski.
        if (country && country !== "PL") i18n.changeLanguage("en");
      })
      .catch(() => {
        /* brak /api/geo (np. lokalnie) - zostaje język domyślny */
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-background min-h-screen flex flex-col text-foreground overflow-x-hidden">
      {/* Ustawia <html lang> zgodnie z aktualnym językiem (PL/EN) + adres kanoniczny per-route */}
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <div className="flex-1 w-full relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
