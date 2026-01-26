"use client";

import { FacePicture } from "@/components/ui/FacePicture";
import { Subtitle, Title } from "@/components/ui/Title";
import { useMediaQuery } from "react-responsive";
import { containerVariants, itemVariants } from "@/components/animation/Variants";
import AnimateOnScroll from "@/components/animation/AnimateOnScroll";

interface PeopleProps {
    cofounders: CofounderItem[],
    techs: TechnologyItem[]
}
export default function People({ cofounders, techs }: PeopleProps) {
    const isDesktop = useMediaQuery({ minWidth: 1280 })

    return (
        <main className="w-screen xl:w-5xl mx-auto">
            <Title text="People" />
            <section>
                <Subtitle text="Founders" />
                <AnimateOnScroll className="mt-8 xl:mt-15 hide-scrollbar flex xl:grid xl:grid-cols-[repeat(auto-fit,minmax(222px,1fr))] flex-row w-full overflow-x-auto snap-x snap-proximity xl:snap-none xl:justify-around gap-10 px-20 xl:px-0 mb-20"
                    custom={isDesktop}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible" once>
                    {
                        cofounders.map((item, idx) => (
                            <Founder key={idx} {...item} isDesktop={isDesktop} />
                        ))
                    }
                </AnimateOnScroll>
            </section>
            <section>
                <Subtitle text="Core Developers" />
                <AnimateOnScroll className="mt-8 xl:mt-15 flex xl:grid xl:grid-cols-[repeat(auto-fit,minmax(192px,1fr))] hide-scrollbar w-full overflow-x-auto gap-10 xl:gap-2 snap-x snap-proximity xl:snap-none mb-20 xl:justify-around px-20 xl:px-0"
                    custom={isDesktop}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible" once>
                    {
                        techs.map((tech, i) => (
                            tech.developers.map((developer, j) => (
                                <Dev key={`${i}-${j}`} tech={tech.name} isDesktop={isDesktop} {...developer} />
                            ))
                        )).flat()
                    }
                </AnimateOnScroll>
            </section>
        </main>
    )
}

interface FounderProps {
    name: string,
    description: string,
    image: string,
    isDesktop: boolean,
    blurData?: string
}

const Founder = ({ name, image, description, isDesktop, blurData }: FounderProps) => {
    return (
        <AnimateOnScroll className={`flex flex-col snap-center xl:snap-align-none items-center group bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-[box-shadow,border-color] duration-300`}
            custom={isDesktop}
            variants={itemVariants}
            once amount={0.2}>
            <FacePicture name={name} src={image} blurData={blurData} priority />
            <div className={`pt-3 pb-1 text-center`}>
                <div className="text-3xl font-bold whitespace-pre-wrap">
                    {name}
                </div>
                <div className="text-lg pt-3 whitespace-pre-wrap">
                    {description}
                </div>
            </div>
        </AnimateOnScroll>
    )
}

interface DevProps {
    name: string,
    tech: string,
    image: string,
    isDesktop: boolean,
    blurData?: string
}
const Dev = ({ name, image, tech, isDesktop, blurData }: DevProps) => {
    return (
        <AnimateOnScroll className={`w-48 flex flex-col snap-center xl:snap-align-none items-center group bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-[box-shadow,border-color] duration-300`}
            custom={isDesktop}
            variants={itemVariants}
            once amount={0.2}>
            <FacePicture name={name} src={image} size={150} blurData={blurData} />
            <div className={`pt-2 pb-1 text-center`}>
                <div className="text-2xl font-bold pt-1 whitespace-pre-wrap">
                    {name}
                </div>
                <div className="pt-1 whitespace-pre-wrap break-keep">
                    {tech}
                </div>
            </div>
        </AnimateOnScroll>
    )
}