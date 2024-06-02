import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18nBackend from 'i18next-http-backend'; 

const browserLanguage = navigator.language.split('-')[0]; // Lấy ngôn ngữ chính từ trình duyệt

i18n
  .use(LanguageDetector)
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: browserLanguage || 'en', // Sử dụng ngôn ngữ của trình duyệt, nếu không có thì mặc định là 'vi'
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    backend: {
      loadPath: `/i18n/{{lng}}.json`,
      requestOptions: {
        cache: 'no-store',
      },
    },
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
    }
  });

export default i18n;
