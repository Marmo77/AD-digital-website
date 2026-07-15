/**
 * Vercel Serverless Function: /api/geo
 * Zwraca kraj odwiedzającego na podstawie nagłówka geolokalizacji Vercela
 * (x-vercel-ip-country – dodawany automatycznie na każdym żądaniu).
 * Używane do automatycznego ustawienia języka EN dla ruchu spoza Polski.
 */

export default async function handler(req: any, res: any) {
  const country =
    (req.headers["x-vercel-ip-country"] as string | undefined) || null;

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ country });
}
