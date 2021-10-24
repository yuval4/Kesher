import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import hebrew from "./hebrew.json";
import arab from "./arab.json";
import english from "./english.json";

i18next.use(initReactI18next).init({
    lng: "he",
    resources: {
        he: hebrew,
        ar: arab,
        // ar: arabic,
        en: english,
    },
    react: {
        useSuspense: false,
    },
    compatibilityJSON: "v3",
});

export default i18next;
