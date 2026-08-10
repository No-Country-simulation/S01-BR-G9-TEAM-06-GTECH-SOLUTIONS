import {
  useMemo,
  type ReactNode,
} from "react";

import { useSettings } from "../context/settings/useSettings";

import {
  translations,
} from "./translations";

import {
  I18nContext,
} from "./I18nContext";

type Props = {
  children: ReactNode;
};

export function I18nProvider({
  children,
}: Props) {
  const { settings } = useSettings();

  const language = settings.language;

  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split(".");

      let value: unknown =
        translations[language];

      for (const currentKey of keys) {
        if (
          typeof value === "object" &&
          value !== null &&
          currentKey in value
        ) {
          value = (
            value as Record<
              string,
              unknown
            >
          )[currentKey];
        } else {
          return key;
        }
      }

      return typeof value === "string"
        ? value
        : key;
    };
  }, [language]);

  return (
    <I18nContext.Provider
      value={{
        language,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}
