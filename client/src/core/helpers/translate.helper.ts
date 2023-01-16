import { Lang } from "@/typing/enums";
import _ from "lodash";

interface ITranslate {
  lang: Lang;
  name?: string;
}
export const getTranslate = <T extends ITranslate>(
  translates: T[],
  lang: Lang
) => {
  try {
    if (!translates || _.isEmpty(translates)) return {} as any as T;
    if (translates.length === 1) return translates[0];

    const item = translates.find((it) => it.lang === lang);
    if (item) return item;

    //const enItem = translates.find((it) => it.lang === Lang.en);
    //if (enItem) return enItem;

    return translates[0];
  } catch (e) {
    return {} as any as T;
  }
};
