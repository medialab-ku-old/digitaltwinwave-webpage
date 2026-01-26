"use client"

import { PostData } from "@/lib/post";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface PostProps {
    postData: PostData
}
export default function Post({ postData }: PostProps) {
    const router = useRouter()

    const withAttachments = postData.attachments.length > 0

    return (
        <main className="w-screen xl:w-5xl mx-auto px-4 xl:px-36">
            <div className="mt-20 xl:mt-30 flex items-center">
                <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="size-7 cursor-pointer" onClick={() => router.back()}
                    whileHover={{ scale: 1.2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </motion.svg>
                <h1 className="ml-2 mr-8 text-3xl xl:text-4xl font-extrabold grow text-center">{postData.title}</h1>
            </div>
            
            <article className={`prose-sm xl:prose-base prose mx-5 xl:mx-9 mt-8 draggable break-keep ${withAttachments ? "mb-10" : "mb-30"}`}>
                <ReactMarkdown
                components={{
                    img: (image) => (
                        <Image src={image.src ? image.src as string : ''} alt={image.alt ? image.alt as string : ''}
                            height={500} width={800} className="my-4" style={{ width: "100%", height: "auto" }}/>
                    ),
                    a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
                    )
                }}>{postData.content}</ReactMarkdown>
            </article>
            
            { withAttachments &&
                <footer className="mx-5 xl:mx-9 mb-20">
                    <h3 className="font-bold text-2xl mb-4">{`첨부파일 (${postData.attachments.length})`}</h3>
                    <div className="flex flex-wrap gap-4">
                        {postData.attachments.map((attachment, idx) => (
                            <div className="rounded-lg bg-white w-64 border px-4 py-2.5 border-slate-200 hover:border-blue-300 hover:text-blue-500 shadow-sm hover:shadow-md transition-all duration-300" key={idx}>
                                <a href={attachment.src} download className="flex items-center justify-between">
                                    <span className="truncate text-sm">{attachment.name}</span>
                                    <div className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </footer>
            }
        </main>
    )
}