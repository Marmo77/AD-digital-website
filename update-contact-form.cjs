const fs = require('fs');

const enPath = './src/i18n/locales/en.json';
const plPath = './src/i18n/locales/pl.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const pl = JSON.parse(fs.readFileSync(plPath, 'utf8'));

en.translation.contact.form = {
  name: "Full Name / Company",
  namePlaceholder: "John Doe",
  phone: "Phone Number (Optional)",
  phonePlaceholder: "+1 000 000 000",
  email: "Email",
  emailPlaceholder: "contact@yourcompany.com",
  message: "Message",
  messagePlaceholder: "Write what you struggle with or describe your project...",
  messageHelp: "If you don't know what to type, just describe what your company does and what you need.",
  privacyStart: "I accept the ",
  privacyLink: "privacy policy",
  privacyEnd: " and consent to data processing for the purpose of handling this inquiry.",
  submit: "Send message",
  sending: "Sending...",
  success: "Sent successfully!",
  successDesc: "Thank you for your message. I will contact you within 24 hours.",
  sendAnother: "Send another message"
};

pl.translation.contact.form = {
  name: "Imię i nazwisko / Firma",
  namePlaceholder: "Jan Kowalski",
  phone: "Nr Telefonu (Opcjonalnie)",
  phonePlaceholder: "+48 000 000 000",
  email: "Email",
  emailPlaceholder: "kontakt@twojafirma.pl",
  message: "Wiadomość",
  messagePlaceholder: "Napisz z czym się zmagasz lub opisz swój projekt...",
  messageHelp: "Jeśli nie wiesz co wpisać, napisz czym się zajmuje twoja firma i czego potrzebujesz.",
  privacyStart: "Akceptuję ",
  privacyLink: "politykę prywatności",
  privacyEnd: " i wyrażam zgodę na przetwarzanie danych w celu obsługi zapytania.",
  submit: "Wyślij wiadomość",
  sending: "Wysyłanie...",
  success: "Wysłano pomyślnie!",
  successDesc: "Dziękuję za wiadomość. Skontaktuję się z Tobą w ciągu najbliższych 24 godzin.",
  sendAnother: "Napisz kolejną wiadomość"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(plPath, JSON.stringify(pl, null, 2));
