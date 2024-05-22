import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import AUTH_VI from './vi/auth.json';
import COMMON_VI from './vi/common.json';

import AUTH_EN from './en/auth.json';
import COMMON_EN from './en/common.json';

export const resources = {
  vi: {
    auth: AUTH_VI,
    common: COMMON_VI,
  },
  en: {
    auth: AUTH_EN,
    common: COMMON_EN,
  },
};

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'vi',
    fallbackLng: 'vi',
    detection: DETECTION_OPTIONS,
    supportedLngs: ['vi', 'en'],
    interpolation: {
      escapeValue: false,
      format(value, format) {
        switch (format) {
          case 'uppercase':
            return value.toUpperCase();
          case 'lowercase':
            return value.toLowerCase();
          case 'capitalize':
            return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
          default:
            return value;
        }
      },
    },

    defaultNS: 'common',
    resources,
  });
