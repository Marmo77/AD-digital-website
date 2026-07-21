/**
 * Prerendering po buildzie.
 *
 * Dlaczego: cała treść strony powstaje w JavaScripcie, a scrapery social mediów
 * (Facebook, LinkedIn) nie wykonują JS, więc każdy udostępniony link pokazywał
 * tytuł ze statycznego index.html, niezależnie od podstrony. Google renderuje JS,
 * ale wolniej i mniej pewnie.
 *
 * Jak: renderujemy tę samą aplikację przez react-dom/server (bez przeglądarki),
 * wstrzykujemy wynik oraz tagi <head> w zbudowany index.html i zapisujemy osobny
 * plik dla każdej trasy. Przy okazji generujemy sitemapę z tych samych tras,
 * żeby nie mogła rozjechać się z routingiem.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");
const SITE_URL = "https://addigital.pl";
const today = new Date().toISOString().slice(0, 10);

async function main() {
  if (!existsSync(serverEntry)) {
    console.error("[prerender] Brak bundla SSR (dist-ssr/entry-server.js).");
    process.exit(1);
  }

  const { render, getRoutes } = await import(pathToFileURL(serverEntry).href);
  const routes = getRoutes();
  const template = readFileSync(join(distDir, "index.html"), "utf-8");

  let ok = 0;
  for (const route of routes) {
    try {
      const { html, head, htmlAttributes } = await render(route.path);

      let page = template.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`,
      );

      // Statyczny <title> musi zniknąć, zanim wstrzykniemy tytuł z Helmeta.
      // Inaczej w dokumencie są dwa tytuły, a crawlery czytają pierwszy,
      // czyli ten ogólny ze strony głównej.
      if (head.includes("<title")) {
        page = page.replace(/<title[^>]*>[\s\S]*?<\/title>\s*/i, "");
      }

      if (head) {
        page = page.replace("</head>", `    ${head}\n  </head>`);
      }
      if (htmlAttributes) {
        page = page.replace(/<html[^>]*>/, `<html ${htmlAttributes}>`);
      }

      const outDir =
        route.path === "/" ? distDir : join(distDir, route.path.replace(/^\//, ""));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), page, "utf-8");
      ok++;
      console.log(`[prerender] ${route.path}`);
    } catch (err) {
      console.error(`[prerender] BŁĄD dla ${route.path}:`, err.message);
      process.exitCode = 1;
    }
  }

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
    )
    .join("\n");

  writeFileSync(
    join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    "utf-8",
  );

  console.log(
    `[prerender] Gotowe: ${ok}/${routes.length} stron, sitemapa: ${routes.length} adresów`,
  );
}

main();
