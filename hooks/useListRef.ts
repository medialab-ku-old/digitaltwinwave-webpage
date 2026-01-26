import { RefObject, useRef } from "react";

export default function useListRef<T>(initial?: T[]): [RefObject<T[]>, (index: number) => (value: T) => void] {
    const rawRef = useRef<T[]>(initial ?? [])
    const getRef = (index: number) => (value: T) => {
        rawRef.current[index] = value
    }
    return [rawRef, getRef]
}