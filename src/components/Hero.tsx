"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        category: "Web Application",
        description: "A comprehensive dashboard for managing online stores with real-time analytics.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=E-Commerce+Dashboard",
        color: "bg-blue-600",
    },
    {
        id: 2,
        title: "AI Chat Assistant",
        category: "Artificial Intelligence",
        description: "Smart conversational interface powered by LLMs with context awareness.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=AI+Chatbot",
        color: "bg-purple-600",
    },
    {
        id: 3,
        title: "Finance Tracker",
        category: "Mobile App",
        description: "Personal finance management with intuitive visualizations and budget planning.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=Finance+App",
        color: "bg-green-600",
    },
    {
        id: 4,
        title: "Social Connect",
        category: "Social Platform",
        description: "Connecting communities through shared interests and real-time events.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=Social+Platform",
        color: "bg-pink-600",
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

    const clearLayerRef = useRef<HTMLDivElement>(null);
    const staticContentRef = useRef<HTMLDivElement>(null);
    const projectLayerRef = useRef<HTMLDivElement>(null);

    // Refs for specific text elements to animate (we'll animate the wrappers or specific children)
    const blurContentRef = useRef<HTMLDivElement>(null);
    const clearContentRef = useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // --- ENTRANCE ANIMATION (Timeline 1) ---
            const entranceTl = gsap.timeline({ delay: 0.5 });
            const roleEase = "power2.out";
            const nameEase = "power3.out";

            const singhElements = gsap.utils.toArray(".hero-singh .char");
            const aveshrajElements = gsap.utils.toArray(".hero-aveshraj .char");
            const roleElements = gsap.utils.toArray(".hero-role");
            const bioElements = gsap.utils.toArray(".hero-bio");

            // 1. Role (Top)
            entranceTl.from(roleElements, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: roleEase,
            })

                // 2. AVESHRAJ (Top Name) - Staggered Chars
                .from(aveshrajElements, {
                    y: -150,
                    opacity: 0,
                    duration: 1.5,
                    ease: nameEase,
                    stagger: 0.05,
                }, "-=0.6")

                // 3. SINGH (Bottom Name) - Staggered Chars
                .from(singhElements, {
                    y: 150,
                    opacity: 0,
                    duration: 1.5,
                    ease: nameEase,
                    stagger: 0.05,
                }, "<0.1")

                // 4. Bio (Bottom)
                .from(bioElements, {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                }, "-=0.8");


            // --- SCROLL INTERACTION (Timeline 2) ---
            // "Gated Reveal"

            if (wrapperRef.current && projectLayerRef.current) {
                const scrollTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=300%", // Increased for longer run
                        scrub: 1.5,
                        pin: true,
                    }
                });

                // Target ALL instances of the text (Blur, Clear)
                const allAveshrajChars = gsap.utils.toArray(".hero-aveshraj .char");
                const allSinghChars = gsap.utils.toArray(".hero-singh .char");

                // Timeline Config (Total ~14)
                // 1. Split: 0 -> 2.5 (Slower, overlapped)
                // 2. Traverse: 0 -> 14 (Immediate start, long duration)
                // 3. Close: 8 -> 14 (Ends with traverse)

                // PHASE 1: OPEN GATE & ENTER (Concurrent)
                scrollTl
                    .to(allAveshrajChars, {
                        yPercent: -150,
                        stagger: 0.2, // Distinct "letter by letter"
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

                    // PHASE 2: PROJECTS TRAVERSE (Starts almost immediately)
                    .fromTo(projectLayerRef.current,
                        { x: "-100vw" },
                        {
                            x: "150vw",
                            ease: "none",
                            duration: 10, // Takes up whole timeline
                        },
                        0.2 // Slight delay after scroll start
                    );

                // PHASE 3: CLOSE GATE (Ends at 14, Starts at 6)
                // "When user reach this position [last project in middle]... letter should start to come"

                const closeStartTime = 4; // Significantly earlier start
                const closeDuration = 4; // Longer duration to settle smoothly as project exits

                scrollTl
                    .to(allAveshrajChars, {
                        yPercent: 0,
                        stagger: 0.2, // Increased stagger for distinct "left to right" wave
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
            }

        }, wrapperRef); // Scope to wrapper to capture everything

        return () => ctx.revert();
    }, []);

    // Shared Content Component
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

    return (
        <div ref={wrapperRef} className="relative w-full h-screen bg-neutral-950"> {/* Wrapper for ScrollTrigger Pinning */}
            <div
                ref={containerRef}
                className="relative h-full w-full overflow-hidden bg-neutral-950 text-white selection:bg-blue-500/30 flex items-center justify-center"
            >
                {/* Background Layer */}
                <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
                    {/* Radial Gradient */}
                    <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-neutral-950/50 to-neutral-950" />
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                </div>

                {/* PROJECT LAYER (Hidden initially, Z-Index 5) */}
                <div
                    ref={projectLayerRef}
                    className="absolute inset-0 z-0 flex items-center justify-center p-8 pointer-events-auto" // Pointer events auto
                    style={{ transform: "translateX(-100%)", willChange: "transform" }}
                >
                    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <div key={project.id} className="relative group bg-neutral-900 rounded-xl overflow-hidden aspect-[3/4] border border-white/10 hover:border-blue-500/50 transition-colors">
                                <div className={`absolute inset-0 ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-mono text-blue-400">{project.category}</span>
                                        <ArrowUpRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                                    </div>
                                    <h3 className="text-xl font-bold leading-tight mb-1">{project.title}</h3>
                                </div>
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
