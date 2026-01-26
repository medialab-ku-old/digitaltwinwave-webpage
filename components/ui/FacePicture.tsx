"use client";

import { normalizePath } from "@/lib/path";
import Image from "next/image"

interface FacePictureProps {
    src: string,
    name: string,
    size?: number,
    priority?: boolean,
    blurData?: string
}
export const FacePicture = ({ src, name, size, priority, blurData }: FacePictureProps) => {
    return (
        <div className={`relative rounded-xl overflow-hidden bg-gray-100 aspect-5/6 border border-gray-200`} style={{ width: size ? `${size}px` : '180px' }}>
            <Image
                src={normalizePath(src)}
                placeholder={blurData ? "blur" : "empty"}
                fill
                alt={name}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={priority}
                blurDataURL={blurData}
            />
        </div>
    )
}