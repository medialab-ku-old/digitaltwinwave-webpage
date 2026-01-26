"use client";
export const dynamic = 'force-static';

import { VideoBackground } from "@/components/layout/Background";
import { DownArrow } from "@/components/ui/DownArrow";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

export default function Home() {
    const tHome = useTranslations('home')

    return (
        <main className="overflow-y-auto snap-y snap-mandatory h-screen overflow-x-hidden hide-scrollbar">
            <Page className="flex justify-center items-center text-center relative">
                <VideoBackground src="background.mp4" />
                <div className="z-10 text-white">
                    <motion.h2 className="font-medium text-xl xl:text-4xl whitespace-pre-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >{tHome('subtitle')}</motion.h2>
                    <motion.h1 className="font-extrabold text-4xl xl:text-7xl mt-2 whitespace-pre-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >{tHome('title')}</motion.h1>
                </div>
                <DownArrow />
            </Page>
            <Page className="flex justify-center items-center bg-black">
                <p className="text-white max-w-[90vw] xl:max-w-3xl xl:text-xl leading-6 xl:leading-8 font-medium text-wrap break-keep text-center xl:text-justify whitespace-pre-wrap">
                    {tHome('content')}
                </p>
            </Page>
        </main>
    );
}

interface PageProps {
    className?: string
}
const Page = ({ className, children }: PropsWithChildren<PageProps>) => {
    return (
        <div className={`w-screen h-screen snap-start ${className}`}>
            {children}
        </div>
    )
}