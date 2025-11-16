import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslations from "~/locales/en.json";
import vnTranslations from "~/locales/vn.json";
import jpTranslations from "~/locales/jp.json";

// Configure resources from external JSON files
const resources = {
  en: {
    translation: enTranslations,
  },
  vi: {
    translation: vnTranslations,
  },
  ja: {
    translation: jpTranslations,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "vi", "ja"],
    detection: {
      // Prefer previously chosen language, then browser settings
      order: ["localStorage", "navigator", "htmlTag", "cookie"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
