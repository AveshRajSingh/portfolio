"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        id: "ambria",
        title: "Ambria",
        description: "A comprehensive e-commerce platform built for a high-end fashion brand, featuring real-time inventory management and a seamless checkout experience.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/ambria.jpeg",
    },
    {
        id: "sitcoders",
        title: "SITcoders",
        description: "A collaborative coding platform designed for students to share resources, participate in hackathons, and build a community of developers.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/sitcoders.jpeg",
    },
    {
        id: "typedev",
        title: "typeDev",
        description: "An interactive typing test application for developers, featuring code-based challenges and real-time performance analytics.",
        technologies: ["Vue.js", "Firebase", "Chart.js", "Tailwind CSS"],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/typedev.png",
    },
];

const SplitText = ({ children, className }: { children: string, className?: string }) => {
    return (
        <span className={`inline-block ${className}`}>
            {children.split("").map((char, index) => (
                <span key={index} className="inline-block char">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null); // Wrapper for pinning

    // We need refs for the animated elements in BOTH layers to sync them or animate a wrapper
    // const clearLayerRef = useRef<HTMLDivElement>(null); // Unused
    // const staticContentRef = useRef<HTMLDivElement>(null); // Unused
    const projectLayerRef = useRef<HTMLDivElement>(null);

    // Refs for specific text elements to animate (we'll animate the wrappers or specific children)
    // const blurContentRef = useRef<HTMLDivElement>(null); // Unused
    // const clearContentRef = useRef<HTMLDivElement>(null); // Unused

    React.useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // --- DESKTOP ANIMATION ---
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=400%",
                    scrub: 1.5,
                    pin: true,
                }
            });

            const allAveshrajChars = gsap.utils.toArray(".hero-aveshraj .char");
            const allSinghChars = gsap.utils.toArray(".hero-singh .char");
            const roleElements = gsap.utils.toArray(".hero-role");
            const bioElements = gsap.utils.toArray(".hero-bio");

            // PHASE 1: OPEN GATE & ENTER
            scrollTl
                .to(allAveshrajChars, {
                    yPercent: -150,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    duration: 2,
                }, 0)
                .to(allSinghChars, {
                    yPercent: 150,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    duration: 2
                }, 0)
                .to(roleElements, { yPercent: -500, opacity: 0, duration: 2 }, 0)
                .to(bioElements, { yPercent: 500, opacity: 0, duration: 2 }, 0)

                // PHASE 2: PROJECTS TRAVERSE
                .fromTo(projectLayerRef.current,
                    { x: "-150vw", y: 0 },
                    {
                        x: "140vw", // Move horizontally Left -> Right
                        y: 0,
                        ease: "none",
                        duration: 10,
                    },
                    0.2
                );

            // PHASE 3: CLOSE GATE
            const closeStartTime = 8;
            const closeDuration = 2;

            scrollTl
                .to(allAveshrajChars, {
                    yPercent: 0,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    duration: closeDuration
                }, closeStartTime)
                .to(allSinghChars, {
                    yPercent: 0,
                    stagger: 0.2,
                    ease: "power2.inOut",
                    duration: closeDuration
                }, closeStartTime)
                .to(roleElements, { yPercent: 0, opacity: 1, duration: closeDuration }, closeStartTime)
                .to(bioElements, { yPercent: 0, opacity: 1, duration: closeDuration }, closeStartTime);
        });

        mm.add("(max-width: 767px)", () => {
            // --- MOBILE ANIMATION ---
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                }
            });

            const allAveshrajChars = gsap.utils.toArray(".hero-aveshraj .char");
            const allSinghChars = gsap.utils.toArray(".hero-singh .char");
            const roleElements = gsap.utils.toArray(".hero-role");
            const bioElements = gsap.utils.toArray(".hero-bio");

            // Open Gate Vertically
            scrollTl
                .to(allAveshrajChars, {
                    y: -150,
                    opacity: 1, // Fade out to avoid clutter
                    stagger: 0.05,
                    ease: "power2.inOut",
                    duration: 2,
                }, 0)
                .to(allSinghChars, {
                    y: 150,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power2.inOut",
                    duration: 2
                }, 0)
                .to(roleElements, { y: -300, opacity: 0, duration: 1 }, 0)
                .to(bioElements, { y: 300, opacity: 0, duration: 1 }, 0)

                // Project Cards move Horizontally (Left to Right)
                .fromTo(projectLayerRef.current,
                    { x: "-300vw", opacity: 1 },
                    {
                        x: "180vw", // Move horizontally across
                        ease: "none",
                        duration: 8,
                    },
                    0
                );

            // Bring names back at the end
            const closeStartTime = 6;
            scrollTl
                .to(allAveshrajChars, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power2.inOut",
                    duration: 2
                }, closeStartTime)
                .to(allSinghChars, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power2.inOut",
                    duration: 2
                }, closeStartTime);
        });

        // --- ENTRANCE ANIMATION (Shared Logic) ---
        const ctx = gsap.context(() => {
            const entranceTl = gsap.timeline({ delay: 0.5 });
            const roleEase = "power2.out";
            const nameEase = "power3.out";

            const singhElements = gsap.utils.toArray(".hero-singh .char");
            const aveshrajElements = gsap.utils.toArray(".hero-aveshraj .char");
            const roleElements = gsap.utils.toArray(".hero-role");
            const bioElements = gsap.utils.toArray(".hero-bio");

            entranceTl.from(roleElements, { y: -50, opacity: 0, duration: 1, ease: roleEase })
                .from(aveshrajElements, { y: -150, opacity: 0, duration: 1.5, ease: nameEase, stagger: 0.05 }, "-=0.6")
                .from(singhElements, { y: 150, opacity: 0, duration: 1.5, ease: nameEase, stagger: 0.05 }, "<0.1")
                .from(bioElements, { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");
        }, wrapperRef);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full h-screen bg-neutral-950">
            <div
                ref={containerRef}
                className="relative h-full w-full overflow-hidden bg-neutral-950 text-white selection:bg-blue-500/30 flex items-center justify-center"
            >
                {/* Background Layer */}
                <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-neutral-950/50 to-neutral-950" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                </div>

                {/* PROJECT LAYER */}
                <div
                    ref={projectLayerRef}
                    className="absolute inset-0 z-0 flex flex-row items-center justify-start md:justify-center pointer-events-auto h-full"
                    style={{ transform: "translateX(-150vw)", willChange: "transform" }} // Start offscreen left
                >
                    {/* Container */}
                    <div className="flex flex-row gap-8 md:gap-24 px-4 md:px-24 items-center h-full w-max">
                        {projects.map((project) => (
                            <div key={project.id} className="w-[85vw] md:w-[60vw] lg:w-[45vw] max-w-sm md:max-w-5xl shrink-0">
                                <ProjectCard
                                    project={{
                                        ...project,
                                        technologies: project.technologies,
                                        links: {
                                            demo: project.links.demo,
                                            github: project.links.github,
                                        },
                                        image: project.image,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* LAYER 1: BASE NAMES (White - Visible by default) - z-10 */}
                <div
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    style={{ opacity: 1 }}
                >
                    <div>
                        <HeroContent showNames={true} showExtras={false} textColor="text-white" />
                    </div>
                </div>

                {/* LAYER 3: STATIC EXTRAS (Role/Bio) - z-40 (Always Clear) */}
                <div
                    className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                >
                    <div>
                        <HeroContent showNames={false} showExtras={true} />
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Shared Content Component - Moved outside
const HeroContent = ({ showNames, showExtras, textColor = "text-white" }: { showNames: boolean, showExtras: boolean, textColor?: string }) => (
    // Removed h-[60vh] and justify-between to collapse the gap.
    // Used justify-center.
    <div className={`flex flex-col items-center justify-center w-full max-w-[1400px] px-4`}>
        {/* Top Section */}
        <div className="flex flex-col items-center">
            {/* 1. Role */}
            <div className={`overflow-hidden mb-4 ${showExtras ? "hero-role" : "invisible"}`}>
                <h2 className="text-sm md:text-lg font-medium text-blue-400 tracking-[0.3em] uppercase">
                    Fullstack Developer
                </h2>
            </div>

            {/* 2. AVESHRAJ */}
            <h1
                className={`text-[12vw] md:text-[11vw] font-bold leading-[0.85] tracking-tighter ${textColor} select-none ${showNames ? "hero-aveshraj" : "invisible"}`}
                style={{ willChange: "transform, opacity, filter" }}
            >
                <SplitText>AVESHRAJ</SplitText>
            </h1>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center">
            {/* 3. SINGH */}
            <h1
                className={`text-[12vw] md:text-[11vw] font-bold leading-[0.85] tracking-tighter ${textColor} select-none mb-4 ${showNames ? "hero-singh" : "invisible"}`}
                style={{ willChange: "transform, opacity, filter" }}
            >
                <SplitText>SINGH</SplitText>
            </h1>

            {/* 4. Bio */}
            <p
                className={`max-w-md text-neutral-400 text-sm md:text-base text-center font-light leading-relaxed ${showExtras ? "hero-bio" : "invisible"}`}
            >
                Crafting digital excellence
            </p>
        </div>
    </div>
);
