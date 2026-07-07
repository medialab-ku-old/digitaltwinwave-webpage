interface CofounderItem {
    name: string,
    description: string,
    image: string,
    blurData?: string
}

interface TechnologyItem {
    name: string,
    description: string,
    developers: {
        name: string,
        image: string,
        blurData?: string
    }[],
    contents: {
        type: "image" | "video" | "localVideo" | string,
        image: string,
        blurData?: string,
        video: string, // youtube URL when type==="video", local path (e.g. "rnd/1-video.mp4") when type==="localVideo"
        isTallImage?: boolean,
        description?: string,
        groupDescription?: string
    }[],
    references: string[]
}

interface TimelineItem {
    time: string,
    content: string
}