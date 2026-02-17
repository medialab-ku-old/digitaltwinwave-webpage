"use client";

import { DownArrow } from "@/components/ui/DownArrow";
import { Title } from "@/components/ui/Title";
import useListRef from "@/hooks/useListRef";
import { ContentImage, ContentImageProps, ContentVideo, ContentVideoProps } from "./content";
import { motion, stagger, Variants } from "motion/react";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import Lightbox from 'yet-another-react-lightbox'
import useLightbox from "@/hooks/useLightbox";
import { normalizePath } from "@/lib/path";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Rnd({ techs }: { techs: TechnologyItem[] }) {
    const [page, setPage] = useState(-1)
    const observerRef = useRef<IntersectionObserver>(null)
    const [targetRefList, getTargetRef] = useListRef<HTMLDivElement>()

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setPage(parseInt(entry.target.id.at(-1) ?? '-1'))
                }
            })
        }, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        })

        targetRefList.current.forEach(target => observerRef.current?.observe(target))

        return () => {
            observerRef.current?.disconnect()
        }
    }, [])

    return (
        <main className="w-screen xl:w-5xl mx-auto overflow-y-auto h-screen snap-y snap-mandatory hide-scrollbar">
            <div className="snap-start snap-always h-screen flex flex-col justify-center relative" ref={getTargetRef(0)}>
                <Title text="R&D" className="" noMargin />
                <DownArrow />
            </div>
            <Navigator navItems={techs.map(({ name }) => name)} page={page} />
            <article className="">
                {techs.map((item, idx) => (
                    <Page key={idx} id={idx.toString()} title={item.name} badge={idx === techs.length - 1}
                        ref={getTargetRef(idx + 1)} description={item.description}>
                        <PageContent {...makePageContent(item)} />
                        {item.references && <PageReferences references={item.references} />}
                    </Page>
                ))}
            </article>
        </main>
    )
}

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: stagger(0.2, { startDelay: 0.2 })
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1, y: 0,
        transition: {
            duration: 0.7
        }
    }
}

interface PageProps {
    id: string,
    title: string,
    description: string,
    ref?: React.Ref<HTMLDivElement>,
    badge?: boolean
}
const Page = ({ children, id, title, ref, description, badge }: PropsWithChildren<PageProps>) => {
    return (
        <motion.section className="w-full h-screen snap-start snap-always flex flex-col justify-center" id={`page${id}`} ref={ref}
            variants={pageVariants} initial="hidden" whileInView="visible"
            viewport={{ amount: 0.6 }}>
            <div>
                <motion.h2 className="max-w-[90vw] xl:max-w-none text-3xl xl:text-4xl font-bold mx-auto break-keep flex justify-center items-center text-center whitespace-pre-wrap"
                    variants={itemVariants}
                >
                    <span>{title}</span>
                    {badge && <div className=""><Badge /></div>}
                </motion.h2>
                <motion.h3 className="text-sm xl:text-lg font-medium pt-7 text-center max-w-[90vw] xl:max-w-175 mx-auto whitespace-pre-wrap break-keep"
                    variants={itemVariants}>
                    {description}
                </motion.h3>
                {children}
            </div>
        </motion.section>
    )
}

const makePageContent = (tech: TechnologyItem): PageContentProps => {
    return {
        groups: tech.contents.map(content => ({
            type: content.type as 'video' | 'image',
            content: content.type === 'image' ? {
                image: content.image,
                alt: content.description ?? "",
                isTallImage: content.isTallImage,
                blurData: content.blurData
            } : {
                videoUrl: content.video
            },
            description: content.description,
            groupDescription: content.groupDescription
        }))
    }
}


interface ContentGroupProps {
    type: 'image' | 'video'
    content: ContentVideoProps | Omit<ContentImageProps, 'onClick'>
    description?: string
    groupDescription?: string
}
interface PageContentProps {
    groups: ContentGroupProps[]
}

const ContentGroup = ({ type, content, description, groupDescription, openLightbox }: ContentGroupProps & { openLightbox: () => void }) => {
    return (
        <div className={`flex flex-col overflow-hidden w-64 xl:w-72 ${description || groupDescription ? "" : "mb-11"}`}>
            {type === 'video' ? <ContentVideo {...(content as ContentVideoProps)} /> : <ContentImage {...(content as Omit<ContentImageProps, 'onClick'>)} onClick={openLightbox} />}
            {description &&
                <h3 className="text-center font-semibold text-sm xl:text-md py-2 xl:py-3 break-keep">
                    {description}
                </h3>
            }
            {!description && groupDescription &&
                <h3 className="xl:hidden text-center font-semibold text-sm py-2 break-keep">
                    {groupDescription}
                </h3>
            }
        </div>
    )
}
const PageContent = ({ groups }: PageContentProps) => {
    const { index, isOpen, openLightbox, closeLightbox } = useLightbox()

    const startIndices = [0]
    const slides = []
    for (const group of groups) {
        if (group.type === "image") {
            const image = group.content as ContentImageProps
            startIndices.push(startIndices[startIndices.length - 1] + 1)
            slides.push({ src: normalizePath(image.image) })
        }
    }

    return (
        <motion.section className="flex xl:grid xl:grid-cols-[repeat(3,max-content)] xl:justify-center xl:max-h-[60vh] flex-row hide-scrollbar gap-x-5 gap-y-0 mt-12 items-start w-full px-10 overflow-x-auto snap-x xl:snap-none snap-proximity"
            variants={itemVariants}>
            {groups.map((group, idx) => (
                <div key={idx} className={`snap-center shrink-0 ${group.groupDescription ? 'xl:relative' : ''}`}>
                    <ContentGroup {...group} openLightbox={() => openLightbox(startIndices[idx])} />
                    {group.groupDescription &&
                        <h3 className="hidden xl:block absolute top-full text-center font-semibold text-sm xl:text-md py-2 xl:py-3 break-keep"
                            style={{ width: 'calc(200% + 1.25rem)' }}>
                            {group.groupDescription}
                        </h3>
                    }
                </div>
            ))}

            <Lightbox open={isOpen} index={index} close={closeLightbox} slides={slides} />
        </motion.section>
    )
}

interface PageReferencesProps {
    references: string[]
}
const PageReferences = ({ references }: PageReferencesProps) => {
    return (
        <motion.section className="mx-4 xl:mx-14 leading-tight xl:leading-normal draggable mt-2 overflow-x-scroll xl:overflow-hidden" variants={itemVariants}>
            <ul className="list-disc pl-5 space-y-2 text-xs xl:text-base">
                {references.map((ref, idx) => (
                    <li key={idx} className="marker:text-current">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer" />
                                ),
                                p: ({ node, ...props }) => (
                                    <p {...props} className="whitespace-pre-line" />
                                )
                            }}
                        >
                            {ref}
                        </ReactMarkdown>
                    </li>
                ))}
            </ul>
        </motion.section>
    )
}

interface NavigatorProps {
    navItems: string[],
    page: number
}
const Navigator = ({ navItems, page }: NavigatorProps) => {
    const handleClick = useCallback((idx: number) => {
        document.getElementById(`page${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    return (
        <nav className="hidden fixed top-[calc(50%-100px)] right-[calc(50%+480px)] w-fit border-l-3 border-slate-900 xl:flex flex-col gap-2 p-3">
            {navItems.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                    {idx === navItems.length - 1 && <div className="-translate-x-1 translate-y-px w-fit"><Badge small /></div>}
                    <span className={`cursor-pointer transition-all duration-300 hover:text-(--brand) whitespace-nowrap ${page === idx ? "text-slate-900 font-bold text-lg" : "text-gray-400"}`}
                        onClick={() => handleClick(idx)}>{item}</span>
                </div>
            ))}
        </nav>
    )
}

const Badge = ({ small }: { small?: boolean }) => {
    return (
        <div className={`bg-white px-2 py-0.5 ${small ? "" : "ml-2"} origin-left h-fit rounded-full text-xs font-semibold text-blue-600 border border-blue-200 shadow-sm whitespace-nowrap ${small ? "scale-[0.9]" : "scale-[1.1]"}`}>
            New Project
        </div>
    )
}