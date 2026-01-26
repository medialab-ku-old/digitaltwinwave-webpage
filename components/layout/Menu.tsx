"use client";

import { Link } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { RefObject, useRef, useState } from 'react';
import styled from 'styled-components';


const StyledWrapper = styled.div`
.burger {
    position: relative;
    width: 32px;
    height: 24px;
    background: transparent;
    display: block;
}

.burger input {
    display: none;
}

.burger span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: #848884;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
}

.burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
}

.burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
}

.burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
}

.burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;

    background: #dadada;
    transition: .25s ease-in-out;
}

.burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 22.4px;
    left: 5px;

    background: #dadada;
    transition: .25s ease-in-out;
}`;


function MenuButton({ handleClick, ref }: { handleClick: () => void, ref: RefObject<HTMLInputElement | null>}) {

    return (
        <div className='xl:hidden z-50 fixed top-4 right-4 scale-75'>
            <StyledWrapper>
            <label className="burger" htmlFor="burger">
                <input type="checkbox" id="burger" ref={ref} onClick={handleClick}/>
                <span />
                <span />
                <span />
            </label>
            </StyledWrapper>
        </div>
    )
}

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const closeFunc = () => {
        setIsOpen(false);
        if (checkboxRef.current) checkboxRef.current.checked = false
    }

    return (
        <>
            <MenuButton handleClick={() => setIsOpen(checkboxRef.current?.checked ?? false)} ref={checkboxRef}/>
            <AnimatePresence>
                { isOpen &&
                <motion.nav className='w-screen h-screen fixed inset-0 z-40 bg-black/90 flex justify-center items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}>
                    
                    <div className=''>
                        <MenuItem text="Home" href="/" close={closeFunc}/>
                        <Bar/>
                        <MenuItem text="People" href="/people" close={closeFunc}/>
                        <Bar/>
                        <MenuItem text="History" href="/history" close={closeFunc}/>
                        <Bar/>
                        <MenuItem text="R&D" href="/rnd" close={closeFunc}/>
                        <Bar/>
                        <MenuItem text="Careers" href="/careers" close={closeFunc}/>
                        <Bar/>
                        <MenuItem text="Contact" href="/contact" close={closeFunc}/>
                    </div>

                </motion.nav>
                }
            </AnimatePresence>
        </>
    )
}

interface ItemProps {
    text: string
    href: string,
    close: () => void
}
const MenuItem = ({ text, href, close }: ItemProps) => {
    return (
        <div className="text-gray-100 font-bold text-2xl text-center">
            <Link href={href} className="" onClick={close}>{text}</Link>
        </div>
    )
}

const Bar = () => {
    return (
        <div className='bg-gray-100/50 h-0.5 mx-10 w-[50vw] my-3'></div>
    )
}