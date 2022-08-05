// SPDX-License-Identifier: GPL-3.0-or-later

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
.use(initReactI18next)
.use(LanguageDetector)
.use(Backend)
.init({
    debug: true,
    fallbackLng: 'nb', //norwegian bokmål
    backend: {
        //trenger linjen fordi homepage er satt i package.json
        loadPath: '/ccc21/locales/nb/{{ns}}.json' //BRUK DEN UNDER OM DET BLIR AKTUELT MED SPRÅKBYTTE
        //loadPath: '/ccc21/locales/{{lng}}/{{ns}}.json'
    }
})