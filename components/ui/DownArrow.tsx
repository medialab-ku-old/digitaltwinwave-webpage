"use client";

import { motion } from "motion/react"

export function DownArrow() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            >
            <svg
                className="w-8 h-8 text-slate-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </motion.div>
    )
}

