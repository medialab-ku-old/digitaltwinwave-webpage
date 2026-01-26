"use client";
import { Title } from "@/components/ui/Title";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export default function History() {
    const t = useTranslations('history')

    const timeline = t.raw('timeline') as TimelineItem[]

    const makeTimeline = () => {
        return timeline.map((item, idx) => {
            return (
                <Fragment key={idx}>
                    { idx > 0 && <Gap height={50}/> }
                    <HistoryItem content={item.content} time={item.time} gray={false} delay={0.2 * (idx + 1)}/>
                </Fragment>
            )
        })
    }

    return (
        <main className="w-[90vw] xl:w-full mx-auto">
            <Title text="History"/>
            <section className="mt-5 flex xl:w-fit mx-auto xl:items-stretch mb-20">
                <div className="rounded-full w-1.25 bg-[linear-gradient(to_bottom,transparent_0%,#0f172a_20%,#0f172a_80%,transparent_100%)]">
                </div>
                <div className="py-30">
                    {makeTimeline()}
                </div>
            </section>
        </main>
    )
}

interface HistoryItemProps {
    content: string,
    time: string,
    gray?: boolean,
    delay: number
}
const HistoryItem = ({ content, time, gray, delay }: HistoryItemProps) => {
    return (
        <div className="relative">
            <div className={`absolute w-4 h-4 rounded-full border-3 bg-white z-10 transition-colors duration-300 top-8 -left-2.5`}></div>
            <motion.div className={`group flex flex-col xl:flex-row gap-2 xl:gap-3 sm:gap-8 p-4 xl:p-6 rounded-xl border transition-[box-shadow,border-color] duration-300 xl:leading-8 ml-4 xl:ml-8
                ${gray 
                    ? "bg-gray-50 border-gray-100 text-gray-500"  // 비활성
                    : "bg-white border-blue-200 xl:border-slate-200 shadow-sm xl:hover:border-blue-200 hover:shadow-md" // 활성
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}  
                transition={{ duration: 0.5, delay }}>
                <div className="text-xl xl:text-2xl font-extrabold xl:w-24 xl:mr-5">{time}</div>
                <div className="h-full font-medium xl:text-xl xl:font-bold whitespace-pre-wrap break-keep">{content}</div>
            </motion.div>
        </div>
    )
}

const Gap = ({ height }: { height: number }) => {
    return (
        <div style={{ height }}></div>
    )
}