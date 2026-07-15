# ADdigital — Profesjonalne Strony Internetowe 🚀

Strona internetowa agencji **ADdigital** specjalizującej się w projektowaniu oraz tworzeniu witryn www, sklepów internetowych oraz aplikacji webowych na terenie Szczecina, Goleniowa, Stargardu, Nowogardu i okolic.

Strona produkcyjna (Live): **[https://addigital.vercel.app/](https://addigital.vercel.app/)**

---

## 📋 Spis treści
- [ADdigital — Profesjonalne Strony Internetowe 🚀](#addigital--profesjonalne-strony-internetowe-)
  - [📋 Spis treści](#-spis-treści)
  - [🌐 O projekcie](#-o-projekcie)
  - [✨ Główne funkcjonalności](#-główne-funkcjonalności)
  - [🛠️ Tech Stack](#️-tech-stack)
    - [Core:](#core)
    - [Stylizowanie i Komponenty:](#stylizowanie-i-komponenty)
    - [Animacje:](#animacje)
    - [Zarządzanie stanem i narzędzia:](#zarządzanie-stanem-i-narzędzia)
    - [Backend-as-a-Service:](#backend-as-a-service)
  - [📂 Struktura projektu](#-struktura-projektu)
  - [🔑 Zmienne środowiskowe](#-zmienne-środowiskowe)
  - [💻 Instalacja i uruchomienie lokalne](#-instalacja-i-uruchomienie-lokalne)
  - [🌐 Wdrożenie (Deployment)](#-wdrożenie-deployment)

---

## 🌐 O projekcie

Strona **ADdigital** to w pełni responsywna, zoptymalizowana pod kątem SEO i nowoczesna wizytówka agencji interaktywnej. Projekt stawia na wyjątkowe wrażenia wizualne (Rich Aesthetics) dzięki płynnym animacjom, mikrointerakcjom oraz trybowi ciemnemu/jasnemu.

Witryna jest w pełni przygotowana do internacjonalizacji i obsługuje formularz kontaktowy zintegrowany z **Google Sheets** (przez funkcję serverless + Google Apps Script), zapisujący leady w arkuszu i wysyłający powiadomienie e-mail o każdym nowym zgłoszeniu.

---

## ✨ Główne funkcjonalności

*   **Płynne animacje i przejścia**: Wykorzystanie GSAP oraz Framer Motion w celu stworzenia przyciągającego wzrok, dynamicznego interfejsu (Interactive & Alive).
*   **Wielojęzyczność (i18n)**: Pełne wsparcie dla lokalizacji dzięki bibliotece `i18next`.
*   **Tryb Ciemny / Jasny (Dark/Light Mode)**: Płynne przełączanie motywów z zapamiętywaniem wyboru użytkownika.
*   **Integracja z Google Sheets**: Formularz kontaktowy przesyła zgłoszenia przez funkcję serverless `/api/lead` do Google Apps Script, który zapisuje wiersz w arkuszu i wysyła powiadomienie e-mail (z obsługą stanów ładowania, sukcesu i błędów oraz honeypotem antyspamowym).
*   **Zgodność z SEO**: Unikalna struktura nagłówków, integracja `react-helmet-async` (meta tagi, tytuły, słowa kluczowe na poszczególnych podstronach).
*   **Pełna Walidacja Formularzy**: Wykorzystanie `react-hook-form` wraz ze schematami walidacji `zod`.

---

## 🛠️ Tech Stack

### Core:
*   **React 19** (z Vite jako narzędziem budującym)
*   **TypeScript** (zapewniający pełne typowanie statyczne)

### Stylizowanie i Komponenty:
*   **Tailwind CSS 4** (wykorzystujący `@tailwindcss/vite` do kompilacji)
*   **Radix UI** (dostępne, bezszwowe komponenty bazowe dla UI)
*   **Lucide React** (nowoczesny i spójny zestaw ikon wektorowych)

### Animacje:
*   **GSAP** (GreenSock Animation Platform)
*   **Framer Motion / Motion**

### Zarządzanie stanem i narzędzia:
*   **React Router DOM v7** (zarządzanie routingiem i kotwicami podstron)
*   **React Hook Form** + **Zod** (obsługa i bezpieczna walidacja formularzy)
*   **i18next** + **react-i18next** (obsługa tłumaczeń)
*   **React Helmet Async** (dynamiczne zarządzanie tagami `<head>` i SEO)

### Backend (leady):
*   **Vercel Serverless Function (`api/lead.ts`)** – proxy formularza (walidacja, honeypot, ukrycie sekretów)
*   **Google Apps Script + Google Sheets** – zapis leadów w arkuszu i powiadomienia e-mail

---

## 📂 Struktura projektu

Główna architektura katalogów i najważniejsze komponenty:

```bash
src/
├── components/          # Reużywalne komponenty React
│   ├── home/            # Sekcje strony głównej (Hero, About, Services, Process, Contact, FAQ, etc.)
│   ├── layout/          # Elementy struktury strony (Navbar, Footer, Layout, ScrollToTop)
│   ├── ui/              # Komponenty interfejsu (Button, Input, Textarea, DotPattern itp.)
│   ├── Home.tsx         # Strona główna agregująca sekcje home
│   ├── PrivacyPolicy.tsx # Strona polityki prywatności
│   ├── ProjectsPage.tsx # Lista zrealizowanych projektów (realizacje)
│   └── ProjectSchema.tsx# Dynamiczna podstrona konkretnej realizacji
├── data/                # Statyczne dane (np. company.ts z danymi teleadresowymi firmy)
├── i18n/                # Pliki lokalizacyjne (tłumaczenia językowe)
├── lib/                 # Funkcje pomocnicze i narzędziowe (np. utils.ts dla klas tailwinda)
├── App.tsx              # Główna konfiguracja routingu aplikacji
├── main.tsx             # Punkt wejścia aplikacji React
├── index.css            # Główny plik stylów Tailwind CSS
└── vite-env.d.ts        # Plik definicji typów dla Vite i zmiennych środowiskowych
```

---

## 🔑 Zmienne środowiskowe

Formularz kontaktowy wysyła leady przez funkcję serverless [`api/lead.ts`](api/lead.ts) do Google Apps Script (zapis w arkuszu + powiadomienie e-mail). Wymagane zmienne to zmienne **serwerowe** (bez prefiksu `VITE_`), ustawiane w panelu Vercel (Settings → Environment Variables):

```env
# Adres wdrożenia Google Apps Script (kończy się na /exec)
LEADS_WEBHOOK_URL="https://script.google.com/macros/s/XXXXX/exec"

# Współdzielony sekret – identyczny jak SHARED_TOKEN w skrypcie Apps Script
LEADS_TOKEN="wlasny-losowy-token"

# Identyfikator witryny zapisywany w arkuszu (kolumna website_id)
LEADS_WEBSITE_ID="1"
```

*Zmienne bez prefiksu `VITE_` są dostępne wyłącznie po stronie serwera (funkcja `/api/lead`) i nie trafiają do bundla przeglądarki. Do lokalnego testu funkcji użyj `vercel dev`.*

---

## 💻 Instalacja i uruchomienie lokalne

1.  **Sklonuj repozytorium**:
    ```bash
    git clone https://github.com/Marmo77/AD-digital-website.git
    cd AD-digital-website
    ```

2.  **Zainstaluj zależności**:
    ```bash
    npm install
    ```

3.  **Skonfiguruj plik zmiennych środowiskowych**:
    Ustaw zmienne z [.env.example](.env.example) (`LEADS_WEBHOOK_URL`, `LEADS_TOKEN`, `LEADS_WEBSITE_ID`) w panelu Vercel. Do lokalnego testu funkcji `/api` użyj `vercel dev`.

4.  **Uruchom serwer deweloperski**:
    ```bash
    npm run dev
    ```
    Aplikacja uruchomi się lokalnie pod adresem: `http://localhost:3000`.

5.  **Sprawdzenie błędów typowania (Linter)**:
    ```bash
    npm run lint
    ```

6.  **Budowanie wersji produkcyjnej**:
    ```bash
    npm run build
    ```

---

## 🌐 Wdrożenie (Deployment)

Projekt jest przystosowany do natywnego wdrożenia na platformie **Vercel** lub Netlify.
W panelu administracyjnym dostawcy hostingu należy zdefiniować te same klucze środowiskowe, które znajdują się w `.env.datas`.
