import { normalizePath } from "@/lib/path";
import { YouTubeEmbed } from "@next/third-parties/google"
import Image from "next/image"

export interface ContentVideoProps {
    videoUrl: string
}

export interface ContentImageProps {
    image: string,
    alt: string,
    isTallImage?: boolean,
    blurData?: string,
    onClick?: () => void
}

export interface ContentLocalVideoProps {
    videoSrc: string,
    onClick?: () => void
}

const videoIdRegex = /[?&]v=([^&]+)/;
const getVideoId = (url: string): string | null => {
    const match = url.match(videoIdRegex)

    if (match) return match[1]
    else return null
}

export const ContentVideo = ({ videoUrl }: ContentVideoProps) => {
    const videoId = getVideoId(videoUrl)
    return (
        <div className="w-[22vw] lg:w-72">
            {videoId &&
                <YouTubeEmbed videoid={videoId}
                    params={`mute=1&controls=1&fs=1`} />
            }
        </div>
    )
}

export const ContentImage = ({ image, alt, isTallImage, blurData, onClick }: ContentImageProps) => {
    return (
        <div className={`${(!isTallImage) ? "w-[22vw] lg:w-72 aspect-video" : "w-[22vw] aspect-31/40 lg:w-auto lg:h-72"} cursor-pointer relative group overflow-hidden`} onClick={onClick}>
            <Image
                src={normalizePath(image)}
                alt={alt}
                placeholder={blurData ? "blur" : "empty"}
                fill
                className="object-cover object-center"
                blurDataURL={blurData}
                sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
            </div>
        </div>
    )
}

export const ContentLocalVideo = ({ videoSrc, onClick }: ContentLocalVideoProps) => {
    return (
        <div className="w-[22vw] lg:w-72 aspect-video cursor-pointer relative group overflow-hidden bg-black" onClick={onClick}>
            {/* preload="metadata" + #t=1 shows a frame ~1s in as the thumbnail (avoids a black first frame); playback happens from the start in the lightbox */}
            <video
                src={`${normalizePath(videoSrc)}#t=1`}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-6 h-6 text-slate-900 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
            </div>
        </div>
    )
}