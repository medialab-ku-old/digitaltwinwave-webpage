'use client'
import Image from "next/image"
import { Link, usePathname } from "../../i18n/navigation"
import { useLocale } from "next-intl"

export const Header = () => {
    return (
        <header className="hidden h-16 border-b border-gray-200 xl:flex justify-center bg-white fixed top-0 w-screen z-100">
            <nav className="w-5xl flex mx-auto items-center">
                <div className="mx-5">
                    <Link href={'/'}>
                        <Image src="/logo.png" width={640} height={480} alt="logo" className="w-20 h-auto cursor-pointer" loading="eager"/>
                    </Link>
                </div>
                <div className="flex justify-start items-center font-semibold ml-36">
                    <HeaderItem text="People" href="/people"/>
                    <HeaderItem text="History" href="/history"/>
                    <HeaderItem text="R&D" href="/rnd"/>
                    <HeaderItem text="Careers" href="/careers"/>
                    <HeaderItem text="Contact" href="/contact"/>
                </div>
                <div className="ml-auto mr-5">
                    <LanguageSwitcher />
                </div>
            </nav>
        </header>
    )
}

interface HeaderItemProps {
    text: string,
    href: string
}
const HeaderItem = ({ text, href } : HeaderItemProps) => {
    return (
        <div className="cursor-pointer px-6 hover:text-(--brand) transition-all duration-200 text-lg"
        >
            <Link href={href} className="text-inherit">{text}</Link>
        </div>
    )
}

const LanguageSwitcher = () => {
    const locale = useLocale()
    const pathname = usePathname()

    return (
        <div className="flex items-center gap-2 text-sm font-medium">
            <Link
                href={pathname}
                locale="ko"
                className={`px-2 py-1 rounded transition-all duration-200 ${
                    locale === 'ko'
                        ? 'text-(--brand) font-bold'
                        : 'text-gray-500 hover:text-(--brand)'
                }`}
            >
                Korean
            </Link>
            <span className="text-gray-300">|</span>
            <Link
                href={pathname}
                locale="en"
                className={`px-2 py-1 rounded transition-all duration-200 ${
                    locale === 'en'
                        ? 'text-(--brand) font-bold'
                        : 'text-gray-500 hover:text-(--brand)'
                }`}
            >
                English
            </Link>
        </div>
    )
}