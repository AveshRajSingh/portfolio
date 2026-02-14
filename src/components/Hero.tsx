"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import gsap from "gsap";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    // Elements to animate
    const headingRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    React.useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.8 }); // Delay to sync with Navbar

            // 1. Identity Sequence (Hero)

            // "Fullstack Developer" Role - Unmask (slide up from invisible container)
            tl.from(roleRef.current, {
                yPercent: 100,
                duration: 1,
                ease: "power4.out",
            })

                // User Name (Main Heading) - Fade In + Slide Up + Scale slightly
                .from(headingRef.current, {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: "power3.out",
                }, "-=0.6")

                // Description
                .from(descRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                }, "-=0.8");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse Parallax (GSAP QuickSetter)
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!bgRef.current || !textRef.current) return;

        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();

        const x = (clientX / width - 0.5) * 2; // -1 to 1
        const y = (clientY / height - 0.5) * 2; // -1 to 1

        // Text moves opposite
        gsap.to(textRef.current, {
            x: -20 * x,
            y: -20 * y,
            duration: 0.5,
            ease: "power1.out",
            overwrite: true,
        });

        // Background moves with mouse
        gsap.to(bgRef.current, {
            x: 10 * x,
            y: 10 * y,
            duration: 0.5,
            ease: "power1.out",
            overwrite: true,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-950 text-white selection:bg-blue-500/30"
        >
            {/* Background Layer */}
            <div ref={bgRef} className="absolute inset-0 z-0">
                {/* Radial Gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-neutral-950/50 to-neutral-950" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center p-4 max-w-5xl mx-auto">
                {/* Role - Unmask Container */}
                <div className="overflow-hidden mb-6">
                    <h2
                        ref={roleRef}
                        className="text-sm md:text-base font-medium text-blue-400 tracking-[0.2em] uppercase"
                    >
                        Fullstack Developer
                    </h2>
                </div>

                <h1
                    ref={headingRef}
                    className="relative mb-8"
                >
                    <div ref={textRef} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">
                        AVESH RAJ SINGH
                    </div>
                </h1>

                <p
                    ref={descRef}
                    className="max-w-2xl text-neutral-400 text-lg md:text-xl leading-relaxed font-light"
                >
                    Building digital experiences that merge <span className="text-white font-medium">high-end motion</span> with clean, functional design.
                </p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
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
    );
};
