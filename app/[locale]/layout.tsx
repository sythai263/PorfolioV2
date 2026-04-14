import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  return <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
}
