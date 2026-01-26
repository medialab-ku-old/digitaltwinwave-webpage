export const dynamic = 'force-static';

import { getPosts } from "@/lib/post"
import Careers from "./view"
import { setRequestLocale } from "next-intl/server";

export const metadata = {
    title: 'Careers'
}

interface Props {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)

    const posts = getPosts()

    return (
        <Careers posts={posts}/>
    )
}