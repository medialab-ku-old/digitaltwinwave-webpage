export const dynamic = 'force-static';

import { getLocalBlurData } from "@/lib/image";
import Rnd from "./view";
import { getTranslations } from "next-intl/server";

export const metadata = {
    title: 'R&D'
}

export default async function Page() {
    const t = await getTranslations()
    const techs = t.raw('technology') as TechnologyItem[]

    // Load all blur data in parallel using Promise.all
    await Promise.all(
        techs.flatMap(tech =>
            tech.contents
                .filter(content => content.type === 'image')
                .map(async (content) => {
                    content.blurData = await getLocalBlurData(content.image)
                })
        )
    )

    return (
        <Rnd techs={techs} />
    )
}