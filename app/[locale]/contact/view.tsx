"use client";

import { Title } from "@/components/ui/Title";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader";
import Image from "next/image";

import campusImage from '@/public/campus.webp'

export default function Contact() {
    const t = useTranslations('contact')

    useKakaoLoader()

    return (
        <main className="w-screen xl:w-5xl mx-auto">
            <Title text="Contact"/>
            
            <div className="w-[90vw] xl:w-fit mx-auto mb-20">
                <div className="mt-10 xl:mt-15 mb-10 xl:flex justify-center">
                    <motion.div className="mt-8 xl:mt-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <div className="w-72 xl:w-80 overflow-hidden mx-auto mb-2 rounded-md border border-slate-200 shdow-sm">
                            <Image src={campusImage} alt="campus" placeholder="blur" className="object-cover w-full h-full"/>
                        </div>
                    </motion.div>
                    <motion.div className=""
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        <ul className="list-disc pl-5 ml-5 xl:ml-10 space-y-1 draggable mx-auto xl:text-lg font-medium">
                            <li className="whitespace-pre-wrap break-keep">{t('location')}</li>
                            <li>{t('phone')}</li>
                            <li>mail@digitaltwinwave.com</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div className="h-fit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}>

                    <div className="w-full aspect-square xl:aspect-5/3 overflow-hidden rounded-lg border border-slate-200">
                        <Map id="map"
                            center={{
                                lat: 37.584495,
                                lng: 127.028308
                            }}
                            style={{ width: "100%", height: "100%" }}
                            level={3}>
                            <MapMarker position={{
                                lat: 37.584550,
                                lng: 127.028450
                            }}></MapMarker>
                        </Map>
                    </div>
                </motion.div>
            </div>

            
        </main>
    )
}


