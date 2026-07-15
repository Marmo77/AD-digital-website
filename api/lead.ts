/**
 * Vercel Serverless Function: /api/lead
 * Odbiera zgłoszenie z formularza kontaktowego i przekazuje je do Google Apps Script
 * (który zapisuje wiersz w arkuszu "Leady" i wysyła powiadomienie e-mail).
 *
 * Adres webhooka i token trzymamy po stronie serwera (nie trafiają do bundla klienta):
 *   - LEADS_WEBHOOK_URL  – adres wdrożenia Apps Script (…/exec)
 *   - LEADS_TOKEN        – współdzielony sekret (ten sam, co SHARED_TOKEN w skrypcie)
 *   - LEADS_WEBSITE_ID   – identyfikator witryny (domyślnie "1")
 */

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const token = process.env.LEADS_TOKEN;
  if (!webhookUrl || !token) {
    console.error("Missing LEADS_WEBHOOK_URL or LEADS_TOKEN env var");
    res.status(500).json({ ok: false, error: "server_misconfigured" });
    return;
  }

  // Body może przyjść jako obiekt (auto-parse) lub string
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { fullname, email, phone, message, company } = body || {};

  // Honeypot: pole "company" jest ukryte przed użytkownikiem – jeśli wypełnione, to bot.
  // Udajemy sukces, żeby bot nie próbował ponownie.
  if (company) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!fullname || !email || !message) {
    res.status(400).json({ ok: false, error: "missing_fields" });
    return;
  }

  const payload = {
    token,
    fullname: String(fullname).trim().slice(0, 200),
    email: String(email).trim().slice(0, 200),
    phone: String(phone || "").trim().slice(0, 50),
    message: String(message).trim().slice(0, 5000),
    website_id: process.env.LEADS_WEBSITE_ID || "1",
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await upstream.text();
    let data: any = {};
    try {
      data = JSON.parse(text);
    } catch {
      /* Apps Script może zwrócić HTML przy błędzie – zostawiamy pusty obiekt */
    }

    if (!upstream.ok || data.ok === false) {
      console.error("Apps Script upstream error:", upstream.status, text.slice(0, 500));
      res.status(502).json({ ok: false, error: "upstream_error" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead forward failed:", err);
    res.status(502).json({ ok: false, error: "network_error" });
  }
}
