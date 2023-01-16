import countries from "i18n-iso-countries";
import { LangsArray } from "../../typing/enums";


countries.registerLocale(require("i18n-iso-countries/langs/uk.json"));
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/pl.json"));

export const getCountryTranslates = (countryCode: string) => {
  return LangsArray.map((_lang) => {
    return {
      lang: _lang,
      name: countries.getName(countryCode, _lang),
    };
  });
};
