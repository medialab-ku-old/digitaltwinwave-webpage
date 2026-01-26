import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import 'yet-another-react-lightbox/styles.css'
import { setRequestLocale } from 'next-intl/server';

import "../globals.css";

import { Header } from "../../components/layout/Header";
import { Background } from "@/components/layout/Background";
import { Menu } from "@/components/layout/Menu";
import ScrollToTop from "@/components/ScrollToTop";

import { locales } from '@/i18n/locales';

const suit = localFont({
    src: '../../fonts/SUIT-Variable.woff2',
    display: 'swap',
})

export async function generateStaticParams() {
    return locales.map((locale) => ({
        locale
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    let { locale } = await params
    const localeMap: Record<string, string> = {
        ko: 'ko_KR',
        en: 'en_US',
    }

    if (!Object.hasOwn(localeMap, locale)) {
        locale = 'ko';
    }

    const t = await getTranslations({
        locale,
        namespace: 'metadata'
    })
    
    const ogLocale = localeMap[locale]

    return {
        metadataBase: new URL("https://digitaltwinwave.com/"),
        alternates: {
            canonical: `/`,
        },
        title: t.raw('title'),
        description: t('description'),
        keywords: [
            "디지털 트윈",
            "디지털 트윈 웨이브",
            "디지털 트윈 기술",
            "디지털 트윈 솔루션",
            "스마트 제조",
            "산업 IoT",
            "시뮬레이션",
            "가상 모델링",
            "디지털 혁신",
            "산업 자동화",
            "AI",
            "IoT",
            "VR",
            "AR",
            "Digital Twin",
            "Digital Twin Wave",
            "Digital Twin Technology",
            "Digital Twin Solutions",
            "Smart Manufacturing",
            "Industrial IoT",
            "Simulation",
            "Virtual Modeling",
            "Digital Innovation",
            "Industrial Automation"
        ],
        icons: {
            icon: '/favicon.ico'
        },
        openGraph: {
            title: t.raw('title'),
            description: t('description'),
            url: 'https://digitaltwinwave.com/',
            siteName: t.raw('title'),
            images: [
                '/favicon.ico'
            ],
            locale: ogLocale,
            type: 'website'
        }
    }
}

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params
    setRequestLocale(locale)
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
              className={`${suit.className} antialiased`}
            >
                <Background/>
                <ScrollToTop/>
                <NextIntlClientProvider messages={messages}>
                    <Header/>
                    <Menu/>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
