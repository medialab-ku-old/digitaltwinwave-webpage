import { defaultLocale, locales } from "@/i18n/locales"
import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://digitaltwinwave.com'

    const routes = [
        '',
        '/contact',
        '/people',
        '/history',
        '/rnd',
        '/careers'
    ]

    return locales.flatMap((locale) => {
        const localePath = (locale === defaultLocale ? '' : `/${locale}`)
        return routes.map((route) => ({
           url: `${baseUrl}${localePath}${route}`,
           priority: (route === '' ? 1 : 0.8) 
        }))
    })
}