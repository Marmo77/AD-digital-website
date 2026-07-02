import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { companyData } from "../data/company";

export default function PrivacyPolicy() {
  return (
    <main className="w-full max-w-3xl mx-auto py-32 px-4 sm:px-6 lg:px-8 relative z-10">
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
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Informacje ogólne</h2>
            <p>
              Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników 
              w związku z korzystaniem z formularzy kontaktowych na stronie internetowej.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Administrator danych</h2>
            <p>
              Administratorem danych osobowych zawartych w serwisie jest {companyData.name}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Cel zbierania danych</h2>
            <p>
              Dane osobowe (imię, adres e-mail, numer telefonu) podane w formularzu kontaktowym są przetwarzane 
              wyłącznie w celu obsługi zapytania, kontaktu z Użytkownikiem oraz ewentualnego przygotowania oferty biznesowej.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Dobrowolność podania danych</h2>
            <p>
              Podanie danych osobowych jest dobrowolne, jednakże niezbędne do przetworzenia zapytania i nawiązania kontaktu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Ochrona danych</h2>
            <p>
              Stosujemy niezbędne środki techniczne i organizacyjne, aby zapewnić bezpieczeństwo Twoich danych osobowych 
              i chronić je przed dostępem osób nieupoważnionych, utratą czy zniszczeniem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Prawa użytkownika</h2>
            <p>
              Masz prawo dostępu do treści swoich danych, ich poprawiania, modyfikacji oraz żądania zaprzestania 
              ich przetwarzania. W tym celu skontaktuj się ze mną bezpośrednio pod adresem widocznym w sekcji Kontakt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Udostępnianie danych</h2>
            <p>
              Zebrane dane służą wyłącznie do bezpośredniego kontaktu. Nie są i nie będą one udostępniane ani odsprzedawane podmiotom trzecim.
            </p>
          </section>
        </div>
    </main>
  );
}
