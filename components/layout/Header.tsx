'use client'
import Image from "next/image"
import { Link, usePathname } from "../../i18n/navigation"
import { useLocale } from "next-intl"

export const Header = () => {
    return (
        <header className="flex h-16 border-b border-gray-200 justify-center bg-white fixed top-0 w-screen z-100">
            <nav className="w-full xl:w-5xl flex mx-auto items-center px-2 xl:px-0 overflow-x-auto hide-scrollbar">
                <div className="shrink-0 mx-1 xl:mx-5">
                    <Link href={'/'}>
                        <Image src="/logo.png" width={640} height={480} alt="logo" className="w-8 xl:w-20 h-auto cursor-pointer" loading="eager"/>
                    </Link>
                </div>
                <div className="flex-1 flex justify-center xl:flex-none xl:justify-start items-center font-semibold xl:ml-36">
                    <HeaderItem text="People" href="/people"/>
                    <HeaderItem text="History" href="/history"/>
                    <HeaderItem text="R&D" href="/rnd"/>
                    <HeaderItem text="Careers" href="/careers"/>
                    <HeaderItem text="Contact" href="/contact"/>
                </div>
                <div className="ml-auto mr-1 xl:mr-5">
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
        <div className="cursor-pointer px-1 text-[11px] whitespace-nowrap xl:px-6 xl:text-lg hover:text-(--brand) transition-all duration-200"
        >
            <Link href={href} className="text-inherit">{text}</Link>
        </div>
    )
}

const LanguageSwitcher = () => {
    const locale = useLocale()
    const pathname = usePathname()

    return (
        <div className="flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium whitespace-nowrap">
            <Link
                href={pathname}
                locale="ko"
                className={`px-1 xl:px-2 py-1 rounded transition-all duration-200 ${
                    locale === 'ko'
                        ? 'text-(--brand) font-bold'
                        : 'text-gray-500 hover:text-(--brand)'
                }`}
            >
                <span className="xl:hidden">KO</span>
                <span className="hidden xl:inline">Korean</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
                href={pathname}
                locale="en"
                className={`px-1 xl:px-2 py-1 rounded transition-all duration-200 ${
                    locale === 'en'
                        ? 'text-(--brand) font-bold'
                        : 'text-gray-500 hover:text-(--brand)'
                }`}
            >
                <span className="xl:hidden">EN</span>
                <span className="hidden xl:inline">English</span>
            </Link>
        </div>
    )
}