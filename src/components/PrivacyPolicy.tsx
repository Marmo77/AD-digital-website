import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { companyData } from "../data/company";

export default function PrivacyPolicy() {
  return (
    <main className="w-full max-w-3xl mx-auto py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <Helmet>
        {/* Tytuł jako jeden string: Helmet gubi <title> z wieloma wyrażeniami {} */}
        <title>{`Polityka prywatności | ${companyData.name}`}</title>
        <meta
          name="description"
          content="Polityka prywatności ADdigital: zasady przetwarzania i ochrony danych osobowych przekazanych przez formularz kontaktowy."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Powrót do strony głównej
      </Link>

      <h1 className="text-3xl lg:text-4xl font-bold mb-10 tracking-tight">Polityka Prywatności</h1>

      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych przekazanych za pośrednictwem formularza kontaktowego
            w serwisie addigital.pl jest Aleksy Dobrodziej, działający pod marką {companyData.name}.
            W sprawach dotyczących danych osobowych możesz skontaktować się pod adresem e-mail:{" "}
            <a href={`mailto:${companyData.email}`} className="text-primary hover:underline">
              {companyData.email}
            </a>{" "}
            lub telefonicznie: {companyData.phone}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Zakres zbieranych danych</h2>
          <p>
            Za pośrednictwem formularza kontaktowego zbieramy następujące dane: imię i nazwisko lub
            nazwę firmy, adres e-mail, numer telefonu (opcjonalnie), treść wiadomości oraz język,
            w którym korzystasz ze strony. Nie zbieramy żadnych danych ponad te, które sam podajesz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Cele i podstawy prawne przetwarzania</h2>
          <p>
            Twoje dane przetwarzamy w celu obsługi przesłanego zapytania oraz przygotowania oferty,
            czyli podjęcia działań przed ewentualnym zawarciem umowy (art. 6 ust. 1 lit. b RODO),
            a także w celu kontaktu zwrotnego i przechowywania korespondencji na potrzeby ewentualnych
            przyszłych ustaleń, co stanowi nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Okres przechowywania danych</h2>
          <p>
            Dane z formularza przechowujemy maksymalnie przez 2 lata od ostatniego kontaktu z Tobą,
            chyba że wcześniej zgłosisz skuteczny sprzeciw lub żądanie usunięcia danych. Po upływie
            tego okresu dane są usuwane.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Odbiorcy danych</h2>
          <p>
            W obsłudze zapytań korzystamy z usług zaufanych dostawców infrastruktury, którzy
            przetwarzają dane w naszym imieniu: Google Ireland Ltd. (przechowywanie zgłoszeń
            w arkuszu kalkulacyjnym oraz obsługa powiadomień e-mail) i Vercel Inc. (hosting strony
            oraz formularza kontaktowego). W związku z tym dane mogą być przekazywane do Stanów
            Zjednoczonych na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień
            ochrony (EU-US Data Privacy Framework) oraz standardowych klauzul umownych. Danych nie
            sprzedajemy ani nie udostępniamy innym podmiotom w celach marketingowych.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Twoje prawa</h2>
          <p>
            Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania, wniesienia sprzeciwu wobec przetwarzania oraz przenoszenia danych.
            Aby skorzystać z tych praw, napisz na adres{" "}
            <a href={`mailto:${companyData.email}`} className="text-primary hover:underline">
              {companyData.email}
            </a>
            . Przysługuje Ci również prawo wniesienia skargi do organu nadzorczego: Prezesa Urzędu
            Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Dobrowolność podania danych</h2>
          <p>
            Podanie danych jest dobrowolne, ale niezbędne do obsługi zapytania i nawiązania kontaktu.
            Bez podania imienia, adresu e-mail i treści wiadomości nie będziemy w stanie odpowiedzieć
            na Twoje zgłoszenie.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Pliki cookies i localStorage</h2>
          <p>
            Strona nie używa plików cookies śledzących ani marketingowych. W pamięci przeglądarki
            (localStorage) zapisujemy wyłącznie Twoje preferencje: wybrany język strony oraz motyw
            (jasny/ciemny). Te informacje nie pozwalają na identyfikację osoby i nie opuszczają Twojej
            przeglądarki. Statystyki odwiedzin zbieramy narzędziem Vercel Analytics, które działa bez
            cookies i nie identyfikuje pojedynczych użytkowników.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Zautomatyzowane decyzje i profilowanie</h2>
          <p>
            Nie podejmujemy wobec Ciebie decyzji w sposób zautomatyzowany i nie stosujemy profilowania.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Zmiany polityki</h2>
          <p>
            W razie zmian w sposobie przetwarzania danych zaktualizujemy niniejszą politykę.
            Aktualna wersja jest zawsze dostępna pod adresem addigital.pl/privacy.
          </p>
          <p className="mt-4 text-sm text-foreground/60">Ostatnia aktualizacja: 23 lipca 2026 r.</p>
        </section>
      </div>
    </main>
  );
}
