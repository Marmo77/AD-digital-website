const fs = require('fs');

const path = 'index.html';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<meta name="description" content="[^"]*" \/>/,
  '<meta name="description" content="ADdigital: Profesjonalne tworzenie stron internetowych w Szczecinie. Strony dla firm, wizytówki, sklepy oraz aplikacje webowe. Obsługujemy również Goleniów, Stargard, Nowogard. Otrzymaj darmową wycenę w 24 godziny!" />'
);

content = content.replace(
  /<meta name="keywords" content="[^"]*" \/>/,
  '<meta name="keywords" content="tworzenie stron internetowych Szczecin, strony internetowe Szczecin, strony www Szczecin, strony dla firm Szczecin, ADdigital, darmowa wycena strony, tworzenie stron Goleniów, tworzenie stron Stargard, tworzenie stron Nowogard, wizytówki, CMS, sklepy internetowe" />'
);

content = content.replace(
  /<meta name="author" content="[^"]*" \/>/,
  '<meta name="author" content="ADdigital" />'
);

content = content.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  '<meta property="og:title" content="ADdigital: Tworzenie Stron Internetowych w Szczecinie. Darmowa Wycena" />'
);

content = content.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  '<meta property="og:description" content="ADdigital: Profesjonalne tworzenie stron internetowych w Szczecinie. Strony dla firm, wizytówki, sklepy oraz aplikacje webowe. Obsługujemy również Goleniów, Stargard, Nowogard. Otrzymaj darmową wycenę w 24 godziny!" />'
);

fs.writeFileSync(path, content);
