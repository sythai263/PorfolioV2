import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  return (
    <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
  );
}
