"use client";

import AnimateOnScroll from "../animation/AnimateOnScroll";

interface TitleProps {
    text: string,
    className?: string,
    noMargin?: boolean
}
export const Title = ({ text, className, noMargin }: TitleProps) => {
    return (
        <AnimateOnScroll className={`text-5xl font-bold text-center ${noMargin === true ? '' : 'mt-20 xl:mt-35'} ${className ?? ''}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} once>
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-violet-700">
                {text}
            </span>
        </AnimateOnScroll>
    )
}

export const Subtitle = ({ text }: { text: string }) => {
    return (
        <AnimateOnScroll className="text-4xl font-bold pt-12 xl:pt-20 text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} once>
            {text}
        </AnimateOnScroll>
    )
}
