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
