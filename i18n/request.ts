import { en, vi } from "@messages";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages;
  switch (locale) {
    case "en":
      messages = en;
      break;
    case "vi":
      messages = vi;
      break;
    default:
      messages = en;
      break;
  }

  return {
    locale,
    messages,
  };
});
