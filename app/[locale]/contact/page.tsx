export const dynamic = 'force-static';

import Contact from "./view"
import { setRequestLocale } from "next-intl/server";

export const metadata = {
    title: 'Contact'
}

interface Props {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <Contact/>
    )
}