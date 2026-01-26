import { stagger, Variants } from "motion/react"

export const containerVariants: Variants = {
    hidden: (isDesktop) => ({
        opacity: 0
    }),
    visible: (isDesktop) => ({
        opacity: 1,
        transition: isDesktop ? {
            delayChildren: stagger(0.2)
        } : undefined
    })
}

export const itemVariants: Variants = {
    hidden: (isDesktop) => ({
        opacity: 0
    }),
    visible: (isDesktop) => ({
        opacity: 1,
        transition: isDesktop ? {
            duration: 0.5
        } : {
            duration: 0.7,
            ease: "easeInOut"
        }
    })
}
