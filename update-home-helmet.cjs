const fs = require('fs');

const path = 'src/components/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<title>Tworzenie Stron Internetowych - Goleniów, Szczecin, Stargard, Nowogard \| {companyData.name}<\/title>/,
  '<title>ADdigital: Tworzenie Stron Internetowych w Szczecinie. Darmowa Wycena</title>'
);

content = content.replace(
  /<meta name="description" content="Profesjonalne projektowanie i tworzenie stron internetowych. Nowoczesne aplikacje webowe w miastach: Goleniów, Szczecin, Stargard, Nowogard. Darmowa wycena i konsultacja." \/>/,
  '<meta name="description" content="ADdigital: Profesjonalne tworzenie stron internetowych w Szczecinie. Strony dla firm, wizytówki, sklepy oraz aplikacje webowe. Obsługujemy również Goleniów, Stargard, Nowogard. Otrzymaj darmową wycenę w 24 godziny!" />'
);

content = content.replace(
  /<meta name="keywords" content="strony internetowe Goleniów, tworzenie stron Szczecin, strony www Stargard, strony internetowe Nowogard, aplikacje webowe, projektowanie stron" \/>/,
  '<meta name="keywords" content="tworzenie stron internetowych Szczecin, strony internetowe Szczecin, strony www Szczecin, strony dla firm Szczecin, ADdigital, darmowa wycena strony, tworzenie stron Goleniów, tworzenie stron Stargard, tworzenie stron Nowogard, wizytówki, CMS, sklepy internetowe" />'
);

fs.writeFileSync(path, content);
