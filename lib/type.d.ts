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
        type: string,
        image: string,
        blurData?: string,
        video: string,
        isTallImage?: boolean,
        description?: string
    }[],
    references: string[]
}

interface TimelineItem {
    time: string,
    content: string
}