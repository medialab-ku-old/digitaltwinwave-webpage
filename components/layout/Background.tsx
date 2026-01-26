"use client"

import { motion } from "motion/react";
import { PropsWithChildren } from "react"


export const Background = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className="fixed top-0 left-0 -z-10 w-screen min-h-screen bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem]">
            {children}
        </div>
    )
}

export function AuroraBackground() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 -z-5 overflow-hidden pointer-events-none bg-white"
        >
          
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-60"></div>

            <div className="absolute inset-0">
              
                <motion.div
                    className="absolute top-1/2 left-1/2 h-125 w-125 rounded-full bg-blue-400 opacity-40 blur-[100px] mix-blend-multiply"
                    initial={{ x: "-80%", y: "-80%" }} 
                    animate={{
                      x: ["-80%", "-60%", "-90%", "-80%"], 
                      y: ["-80%", "-60%", "-90%", "-80%"], 
                      scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-1/2 left-1/2 h-150 w-150 rounded-full bg-purple-400 opacity-40 blur-[100px] mix-blend-multiply"
                    initial={{ x: "-10%", y: "-20%" }}
                    animate={{
                      x: ["-10%", "10%", "-20%", "-10%"],
                      y: ["-20%", "0%", "-30%", "-20%"],
                      scale: [1, 1.1, 0.8, 1],
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-1/2 left-1/2 h-125 w-125 rounded-full bg-pink-300 opacity-40 blur-[100px] mix-blend-multiply"
                    initial={{ x: "-70%", y: "0%" }}
                    animate={{
                      x: ["-70%", "-50%", "-80%", "-70%"],
                      y: ["0%", "20%", "-10%", "0%"],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                />
            </div>
        </motion.div>
    );
}

export function VideoBackground({ src }: { src: string }) {
    return (
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none bg-black">
            <motion.div transition={{ duration: 1, ease: "easeInOut" }}>
                <video
                    src={src}
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover opacity-50 blur-xs"
                />
            </motion.div>
        </div>
    );
}