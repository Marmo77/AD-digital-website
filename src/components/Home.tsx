import { Hero } from "./home/Hero";
import { ForWho } from "./home/ForWho";
import { Services } from "./home/Services";
import { Process } from "./home/Process";
import { Projects } from "./home/Projects";
import { About } from "./home/About";
import { Testimonials } from "./home/Testimonials";
import { FAQ } from "./home/FAQ";
import { Contact } from "./home/Contact";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DotPattern } from "./ui/dot-pattern";
import { companyData } from "../data/company";

export default function Home() {
  const { t, i18n } = useTranslation();

  const faqItems = t("faq.items", { returnObjects: true }) as { question: string; answer: string }[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${companyData.url}/#business`,
      name: companyData.name,
      description: t("footer.description"),
      url: companyData.url,
      image: `${companyData.url}/fallback.jpg`,
      logo: `${companyData.url}/logo.svg`,
      email: companyData.email,
      telephone: companyData.phone,
      priceRange: "1500 - 5000 PLN",
      address: {
        "@type": "PostalAddress",
        addressLocality: companyData.location,
        addressCountry: "PL",
      },
      areaServed: ["Szczecin", "Goleniów", "Stargard", "Nowogard"],
      sameAs: [
        companyData.socials.instagram,
        companyData.socials.facebook,
        companyData.socials.github,
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: (Array.isArray(faqItems) ? faqItems : []).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          ADdigital: Tworzenie Stron Internetowych w Szczecinie. Darmowa Wycena
        </title>
        <meta
          name="description"
          content="ADdigital: Profesjonalne tworzenie stron internetowych w Szczecinie. Strony dla firm, wizytówki, sklepy oraz aplikacje webowe. Obsługujemy również Goleniów, Stargard, Nowogard. Otrzymaj darmową wycenę w 24 godziny!"
        />
        <meta
          name="keywords"
          content="tworzenie stron internetowych Szczecin, strony internetowe Szczecin, strony www Szczecin, strony dla firm Szczecin, ADdigital, darmowa wycena strony, tworzenie stron Goleniów, tworzenie stron Stargard, tworzenie stron Nowogard, wizytówki, CMS, sklepy internetowe"
        />
        <meta property="og:locale" content={i18n.language === "en" ? "en_US" : "pl_PL"} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Scrolling Dot Pattern below Hero */}
      <div className="absolute top-[100svh] inset-x-0 bottom-0 pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent,black_10vh,black_calc(100%-10vh),transparent)]">
        <DotPattern
          width={24}
          height={24}
          cx={2}
          cy={2}
          cr={1.5}
          className="opacity-40 dark:opacity-30 h-full w-full"
        />
      </div>

      <div className="relative z-10 w-full">
        <main>
          <Hero />
          <Projects />
          <About />
          <Services />
          <ForWho />
          <Process />
          {/* <Testimonials /> */}
          <FAQ />
          <Contact />
        </main>
      </div>
    </>
  );
}
