import { useState } from "react"

export default function useLightbox() {
    const [index, setIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const openLightbox = (index: number) => {
        setIndex(index)
        setIsOpen(true)
    }

    return { index, openLightbox, isOpen, closeLightbox: () => setIsOpen(false) }
}