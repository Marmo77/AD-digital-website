const fs = require('fs');

const path = 'src/components/home/Contact.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<h3 className="text-3xl font-bold tracking-tight">Wysłano pomyślnie!<\/h3>/,
  '<h3 className="text-3xl font-bold tracking-tight">{t("contact.form.success")}</h3>'
);

content = content.replace(
  /<p className="text-muted-foreground text-lg max-w-sm mx-auto">\s*Dziękuję za wiadomość\. Skontaktuję się z Tobą w ciągu najbliższych 24 godzin\.\s*<\/p>/,
  '<p className="text-muted-foreground text-lg max-w-sm mx-auto">{t("contact.form.successDesc")}</p>'
);

content = content.replace(
  /Napisz kolejną wiadomość/,
  '{t("contact.form.sendAnother")}'
);

content = content.replace(
  /Imię i nazwisko \/ Firma/,
  '{t("contact.form.name")}'
);
content = content.replace(
  /placeholder="Jan Kowalski"/,
  'placeholder={t("contact.form.namePlaceholder")}'
);

content = content.replace(
  /Nr Telefonu \(Opcjonalnie\)/,
  '{t("contact.form.phone")}'
);
content = content.replace(
  /placeholder="\+48 000 000 000"/,
  'placeholder={t("contact.form.phonePlaceholder")}'
);

content = content.replace(
  /<Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">\s*Email\s*<\/Label>/,
  '<Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">{t("contact.form.email")}</Label>'
);
content = content.replace(
  /placeholder="kontakt@twojafirma\.pl"/,
  'placeholder={t("contact.form.emailPlaceholder")}'
);

content = content.replace(
  /<Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">\s*Wiadomość\s*<\/Label>/,
  '<Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">{t("contact.form.message")}</Label>'
);
content = content.replace(
  /placeholder="Napisz z czym się zmagasz lub opisz swój projekt..."/,
  'placeholder={t("contact.form.messagePlaceholder")}'
);

content = content.replace(
  /Jeśli nie wiesz co wpisać, napisz czym się zajmuje twoja firma i czego potrzebujesz\./,
  '{t("contact.form.messageHelp")}'
);

content = content.replace(
  /Akceptuję <Link to="\/privacy" className="text-primary hover:underline">politykę prywatności<\/Link> i wyrażam zgodę na przetwarzanie danych w celu obsługi zapytania\./,
  '{t("contact.form.privacyStart")}<Link to="/privacy" className="text-primary hover:underline">{t("contact.form.privacyLink")}</Link>{t("contact.form.privacyEnd")}'
);

content = content.replace(
  /"Wysyłanie..."/,
  't("contact.form.sending")'
);

content = content.replace(
  /Wyślij wiadomość/,
  '{t("contact.form.submit")}'
);

fs.writeFileSync(path, content);
