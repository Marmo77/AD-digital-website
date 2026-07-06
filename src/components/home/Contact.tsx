import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, scale } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Send, Phone, Mail, Clock } from "lucide-react";
import { companyData } from "../../data/company";
import { Link } from "react-router-dom";

// Schemat formularza walidacji
const contactFormValidationSchema = z.object({
  name: z.string().min(2, "Imię jest wymagane"),
  email: z.email("Nieprawidłowy adres email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Wiadomość jest za krótka"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Musisz zaakceptować politykę prywatności",
  }),
});

// uproszczenie - zamiana w typ 
type ContactFormValues = z.infer<typeof contactFormValidationSchema>;


const ContactFormComponent = () => {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Definiowanie pól formularza
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormValidationSchema),
    defaultValues: {
      privacy: false,

    }
  });

  // Website ID: X w env jest, aby leak prevention, to jest id strony na serwerze
  const websiteID = process.env.REACT_APP_WEBSITE_ID;
  console.log("Website ID:", websiteID);


  const privacyAccepted = watch("privacy");
  // walidacja po przeslaniu
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Fake API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    setTimeout(() => setIsSuccess(false), 5000);
  }
  return (
    <>
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center h-full min-h-[400px] gap-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Send className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-3xl font-bold tracking-tight">{t("contact.form.success")}</h3>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">{t("contact.form.successDesc")}</p>
          <Button
            onClick={() => {
              reset();
              setIsSuccess(false);
            }}
            variant="outline"
            className="mt-4 border-primary/20 hover:bg-primary/5"
          >
            {t("contact.form.sendAnother")}
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">
                {t("contact.form.name")}
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder={t("contact.form.namePlaceholder")}
                className={`bg-background h-12 rounded-xl border border-border/60 dark:border-white/10 focus:border-primary focus:ring-primary/20 ${errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/20 ring-1 ring-destructive" : ""}`}
              />
              {errors.name && <span className="text-xs text-destructive ml-1">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">
                {t("contact.form.phone")}
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder={t("contact.form.phonePlaceholder")}
                className="bg-background h-12 rounded-xl border border-border/60 dark:border-white/10 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">{t("contact.form.email")}</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("contact.form.emailPlaceholder")}
              className={`bg-background h-12 rounded-xl border border-border/60 dark:border-white/10 focus:border-primary focus:ring-primary/20 ${errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/20 ring-1 ring-destructive" : ""}`}
            />
            {errors.email && <span className="text-xs text-destructive ml-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground ml-1">{t("contact.form.message")}</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder={t("contact.form.messagePlaceholder")}
              className={`bg-background min-h-[140px] resize-y rounded-xl border border-border/60 dark:border-white/10 focus:border-primary focus:ring-primary/20 ${errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/20 ring-1 ring-destructive" : ""}`}
            />
            {errors.message && <span className="text-xs text-destructive ml-1">{errors.message.message}</span>}
            <p className="text-xs text-muted-foreground italic mt-1 ml-1">
              {t("contact.form.messageHelp")}
            </p>
          </div>

          <div className="flex items-start gap-3 mt-2">
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="privacy"
                type="checkbox"
                {...register("privacy")}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 bg-background accent-primary cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="privacy" className="text-sm text-foreground/80 cursor-pointer font-normal leading-tight">
                {t("contact.form.privacyStart")}<Link to="/privacy" className="text-primary hover:underline">{t("contact.form.privacyLink")}</Link>{t("contact.form.privacyEnd")}
              </Label>
              {errors.privacy && <span className="text-xs text-destructive mt-1">{errors.privacy.message}</span>}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full h-14 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_4px_20px_rgba(45,212,191,0.2)] hover:shadow-[0_8px_30px_rgba(45,212,191,0.4)] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !privacyAccepted}
          >
            {isSubmitting ? (
              t("contact.form.sending")
            ) : (
              <>
                <span className="relative z-10 flex items-center">
                  {t("contact.form.submit")}
                  <Send className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </>
            )}
          </Button>
        </form>
      )}
    </>
  )
}


export function Contact() {

  const { t } = useTranslation();

  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 relative z-10">

        {/* Left Info side */}
        <div className="flex flex-col justify-start pt-2 gap-12">
          <div className="flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block font-mono"
            >
              {t("contact.badge")}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6 text-foreground"
            >
              {t("contact.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-md"
            >
              {t("contact.description")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <a href={`mailto:${companyData.email}`} className="flex items-center gap-6 group w-fit">
              <div className="w-16 h-16 bg-background border border-primary/20 rounded-2xl flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-lg group-hover:shadow-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("contact.write")}</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{companyData.email}</p>
              </div>
            </a>

            <a href={`tel:${companyData.phone.replace(/\s+/g, '')}`} className="flex items-center gap-6 group w-fit">
              <div className="w-16 h-16 bg-background border border-primary/20 rounded-2xl flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-lg group-hover:shadow-primary/10">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("contact.call")}</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{companyData.phone}</p>
              </div>
            </a>

            <div className="flex items-start gap-6 group w-fit mt-2">
              <div className="w-16 h-16 bg-background border border-primary/20 rounded-2xl flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-lg group-hover:shadow-primary/10 shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col pt-1">
                <p className="text-sm text-muted-foreground mb-1.5">{t("contact.hours")}</p>
                <div className="flex flex-col gap-1">
                  {companyData.hours.split(', ').map(line => (
                    <p key={line} className="text-base font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-background border border-primary/30 dark:border-primary/60 p-8 md:p-10 rounded-2xl shadow-xl hover:border-primary/60 dark:hover:border-primary transition-colors relative"
        >
          <ContactFormComponent />
        </motion.div>

      </div>
    </section>
  );
}
