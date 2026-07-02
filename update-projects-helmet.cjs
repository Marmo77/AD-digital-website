const fs = require('fs');

const path = 'src/components/ProjectsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<title>Realizacje - Tworzenie Stron Internetowych Goleniów, Szczecin \| {companyData.name}<\/title>/,
  '<title>ADdigital: Realizacje | Tworzenie Stron Internetowych Szczecin</title>'
);

fs.writeFileSync(path, content);
