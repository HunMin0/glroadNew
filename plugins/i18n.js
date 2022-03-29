/*import {en, ko} from 'vuetify/es5/locale'

export default {
  en: {$vuetify: en, ...require('../locales/en.json')},
  ko: {$vuetify: ko, ...require('../locales/ko.json')},
}*/

export default function ({ app }) {
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
    console.log(oldLocale, newLocale, isInitialSetup)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log(oldLocale, newLocale)
  }
}
