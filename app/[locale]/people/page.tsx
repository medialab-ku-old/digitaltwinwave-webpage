export const dynamic = 'force-static';

import { getLocalBlurData } from "@/lib/image";
import People from "./view"
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata = {
    title: 'People'
}

interface Props {
    params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations()
    const cofounders = t.raw('cofounder') as CofounderItem[]
    const techs = t.raw('technology') as TechnologyItem[]

    // Load all blur data in parallel using Promise.all
    await Promise.all([
        ...cofounders.map(async (cofounder) => {
            cofounder.blurData = await getLocalBlurData(cofounder.image)
        }),
        ...techs.flatMap(async (tech) =>
            tech.developers.map(async (developer) => {
                developer.blurData = await getLocalBlurData(developer.image)
            })
        )
    ])

    return (
        <People cofounders={cofounders} techs={techs} />
    )
}