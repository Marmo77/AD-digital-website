/**
 * Wejście dla prerenderingu (build-time).
 * Renderuje tę samą aplikację co przeglądarka, ale przez StaticRouter,
 * i zwraca HTML wraz z tagami <head> zebranymi przez react-helmet-async.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
// W React Router v7 pakiety sa skonsolidowane, StaticRouter jest w glownym eksporcie
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./AppRoutes";
import { ThemeProvider } from "./components/theme-provider";
import { citiesData } from "./data/cities";
import { projectsData } from "./data/projects";
import i18n from "./i18n/config";

/**
 * Lista tras do prerenderingu i sitemapy, budowana z tych samych danych,
 * z których korzysta routing. Dzięki temu dodanie miasta lub realizacji
 * automatycznie trafia do obu miejsc i nic nie może się rozjechać.
 */
export function getRoutes() {
  return [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    ...citiesData.map((city) => ({
      path: `/${city.slug}`,
      priority: "0.9",
      changefreq: "monthly",
    })),
    { path: "/realizacje", priority: "0.8", changefreq: "monthly" },
    ...projectsData.map((project) => ({
      path: `/realizacje/${project.id}`,
      priority: "0.6",
      changefreq: "monthly",
    })),
    { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  ];
}

export type RenderResult = {
  html: string;
  head: string;
  htmlAttributes: string;
};

export async function render(url: string): Promise<RenderResult> {
  // Prerenderujemy wersję polską: to język główny i to ją indeksuje Google.
  // Automatyczne przełączenie na EN dla ruchu spoza Polski działa po stronie klienta.
  await i18n.changeLanguage("pl");

  const helmetContext: { helmet?: any } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider defaultTheme="light" storageKey="ad-digital">
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  );

  // React 19 renderuje tagi metadanych tam, gdzie stoją w drzewie, czyli
  // wewnątrz body, a helmetContext przy tej wersji zostaje pusty. Dlatego
  // wyciągamy je z wyrenderowanego HTML i sami przenosimy do <head>.
  const headTagPatterns = [
    /<title[^>]*>[\s\S]*?<\/title>/gi,
    /<meta\b[^>]*?\/?>/gi,
    /<link\b[^>]*?\/?>/gi,
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
  ];

  const collected: string[] = [];
  let body = html;
  for (const pattern of headTagPatterns) {
    body = body.replace(pattern, (tag) => {
      collected.push(tag);
      return "";
    });
  }

  const { helmet } = helmetContext;

  return {
    html: body,
    head: collected.join("\n    "),
    htmlAttributes: helmet?.htmlAttributes?.toString() ?? 'lang="pl"',
  };
}
