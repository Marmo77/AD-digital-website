/**
a) What it does:
Serverless fn on /api/lead. Takes contact form data (name, email, phone, message, lang), validates, forwards to Apps Script webhook - writes row in Sheets + sends me an email. Basically: client submits form - I get pinged in few sec.

b) Key decisions:
- Webhook URL + token in process.env - never shows to a client bundle
- Honeypot field that bot fills (anti bot)
- trimmed and sliced every field before forwarding no oversized data hitting the sheet
- added language field, normalized to EN/PL site is bilingual, wanted the email notif in the right language automatically
- Few types of errors (missing_fields, server_misconfigured, upstream_error, network_error) instead of one generic 500. Its easier to debug at midnight when something breaks :D
- left detail in the 502 response -- temp, for debugging while it was still flaky, should probably strip before prod but kept it since its genuinely useful

c) Why I like it:
First piece of infra that actually makes money for the agency.
Every lead goes through this exact function. Small file, but forced me to think about stuff a tutorial wouldn't cover like secrets can't touch the client, 
bots find your form within hours of going live, 
and good error messages save you way more time than they cost to write.
And also its important to me to get leads from my potential clients.
 */

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const token = process.env.LEADS_TOKEN;
  if (!webhookUrl || !token) {
    const missing = [
      !webhookUrl && "LEADS_WEBHOOK_URL",
      !token && "LEADS_TOKEN",
    ].filter(Boolean);
    console.error("Missing env var(s):", missing.join(", "));
    res.status(500).json({ ok: false, error: "server_misconfigured", missing });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { fullname, email, phone, message, company, language } = body || {};

  // honeypot
  if (company) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!fullname || !email || !message) {
    res.status(400).json({ ok: false, error: "missing_fields" });
    return;
  }
  // lang
  const normalizedLanguage =
    String(language || "").toUpperCase() === "EN" ? "EN" : "PL";

  const payload = {
    token,
    fullname: String(fullname).trim().slice(0, 200),
    email: String(email).trim().slice(0, 200),
    phone: String(phone || "")
      .trim()
      .slice(0, 50),
    message: String(message).trim().slice(0, 5000),
    language: normalizedLanguage,
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
    } catch {}

    if (!upstream.ok || data.ok === false) {
      const detail = data.error || text.slice(0, 300);
      console.error("Apps Script upstream error:", upstream.status, detail);
      // temp for check
      res.status(502).json({
        ok: false,
        error: "upstream_error",
        status: upstream.status,
        detail,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Lead forward failed:", err);
    res.status(502).json({ ok: false, error: "network_error" });
  }
}
