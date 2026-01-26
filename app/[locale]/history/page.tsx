export const dynamic = 'force-static';

import History from "./view"
import { setRequestLocale } from "next-intl/server";

export const metadata = {
    title: 'History'
}

interface Props {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <History/>
    )
}