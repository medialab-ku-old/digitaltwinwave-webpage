"use client";

import { AnimationDefinition, motion, TargetAndTransition, Transition, useAnimation, useInView, VariantLabels, Variants, ViewportOptions } from "motion/react";
import { PropsWithChildren, useEffect, useRef } from "react";

interface AnimateOnScrollProps { 
    className?: string,
    custom?: any,
    variants?: Variants,
    initial?: boolean | TargetAndTransition | VariantLabels,
    whileInView?: AnimationDefinition,
    transition?: Transition<any>,
    once?: boolean,
    amount?: number
}
export default function AnimateOnScroll(props: PropsWithChildren<AnimateOnScrollProps>) {
    const ref = useRef(null)
    const controls = useAnimation()

    const isInView = useInView(ref, {
        once: props.once,
        amount: props.amount
    })

    useEffect(() => {
        if (isInView && props.whileInView) {
            controls.start(props.whileInView)
        }
    }, [isInView, controls])

    return (
        <motion.div ref={ref} className={props.className}
            custom={props.custom} variants={props.variants}
            initial={props.initial} animate={controls}
            transition={props.transition}>
            {props.children}
        </motion.div>
    )
}