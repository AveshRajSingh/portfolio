"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, Variants, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/utils/cn";
import { ArrowUpRight, Code, Layers, Briefcase, MessageCircle, Home } from "lucide-react";

export const Header = () => {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isExperiencePage = pathname === "/experience";
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Desktop Refs
    const headerRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const linksContainerRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    // Mobile Refs
    const mobileDockRef = useRef<HTMLDivElement>(null);
    const mobileIndicatorRef = useRef<HTMLDivElement>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastScrollY.current;
        const diff = latest - previous;
        const isScrollingDown = diff > 0;
        const isScrollingUp = diff < 0;

        // Hide if scrolling down and past 50px
        if (isScrollingDown && latest > 50) {
            setIsVisible(false);
        }
        // Show if scrolling up or at the top
        else if (isScrollingUp || latest < 50) {
            setIsVisible(true);
        }

        lastScrollY.current = latest;
    });

    // GSAP Entrance Animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // --- Desktop/Global Top Bar Animation ---
            tl.from(containerRef.current, {
                yPercent: -150,
                duration: 1.2,
                ease: "power4.out",
                opacity: 0,
            })

                // CTA (Desktop only)
                .from(ctaRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                }, "-=0.2")

                // Desktop Nav Links
                .from(".nav-link-item", {
                    x: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: -0.15,
                    ease: "power2.out",
                }, "-=0.4")

                // Name & Subtitle
                .from(nameRef.current, {
                    x: -30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "-=0.2")
                .from(subtitleRef.current, {
                    y: 10,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                }, "-=0.4");

            // --- Mobile Bottom Dock Animation ---
            if (mobileDockRef.current) {
                tl.from(mobileDockRef.current, {
                    yPercent: 150,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out"
                }, 0.5);

                tl.from(".mobile-nav-item", {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.5)"
                }, "<0.4");
            }

        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic Button Logic (Framer Motion)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ctaRef.current) return;

            // Target the actual button inside the container if needed, or just the container
            // The ctaRef is on the div wrapper, but the motion.a is the button.
            // Let's attach a ref to the motion.a directly or use the wrapper for measurements.
            // Looking at the JSX, ctaRef is the wrapper. Let's use that for positioning but animate the button?
            // Actually, currently ctaRef is on the div wrapper lines 268.
            // And the motion.a is inside it.
            // We want to move the button.
            // Let's verify if we can animate the wrapper or if we need to animate the button.
            // The existing GSAP code animated `ctaRef.current`.
            // So we should animate the same element or pass styles to motion.a.

            const element = ctaRef.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Logic:
            // "Dead Zone": < 60px -> snap to center
            // "Magnetic Zone": < 150px -> follow cursor
            if (distance < 150) {
                if (distance < 60) {
                    mouseX.set(0);
                    mouseY.set(0);
                } else {
                    mouseX.set(distanceX * 0.2); // Reduced factor for smoother feel
                    mouseY.set(distanceY * 0.2);
                }
            } else {
                mouseX.set(0);
                mouseY.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Desktop Hover Logic
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!indicatorRef.current || !e.currentTarget || !linksContainerRef.current) return;
        moveIndicator(e.currentTarget, indicatorRef.current, linksContainerRef.current);
    };

    const handleMouseLeave = () => {
        if (!indicatorRef.current) return;
        hideIndicator(indicatorRef.current);
    };

    // Mobile Hover/Touch Logic
    const handleMobileEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!mobileIndicatorRef.current || !e.currentTarget || !mobileDockRef.current) return;
        moveIndicator(e.currentTarget, mobileIndicatorRef.current, mobileDockRef.current);
    };

    const handleMobileLeave = () => {
        if (!mobileIndicatorRef.current) return;
        hideIndicator(mobileIndicatorRef.current);
    };

    // Shared Helper Functions
    const moveIndicator = (target: HTMLElement, indicator: HTMLElement, container: HTMLElement) => {
        const containerRect = container.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const relativeLeft = targetRect.left - containerRect.left;

        gsap.to(indicator, {
            x: relativeLeft,
            width: targetRect.width,
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.75)",
        });
    };

    const hideIndicator = (indicator: HTMLElement) => {
        gsap.to(indicator, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const navLinks = [
        { name: "Home", href: "/", icon: Home },
        { name: "Skills", href: "/#skills", icon: Code },
        { name: "Projects", href: "/projects", icon: Layers },
        { name: "Experience", href: "/experience", icon: Briefcase },
    ];

    // Custom Scroll Handler
    const handleScrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header ref={headerRef}>
            {/* Top Navbar (Logo + Desktop Nav) */}
            <div className={`fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 md:px-8 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-[200%]"}`}>
                <div
                    ref={containerRef}
                    className={cn(
                        "flex items-center justify-between px-6 py-3 rounded-4xl shadow-2xl overflow-hidden transition-colors duration-300",
                        isExperiencePage
                            ? "bg-black/90 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-md"
                            : "bg-white/80 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200/50 dark:border-white/10"
                    )}
                    style={{ maxWidth: "1280px", width: "100%" }}
                >
                    {/* 1. Logo Section - Centered on Mobile, Left on Desktop */}
                    <div ref={logoRef} className="flex-1 flex justify-center md:justify-start items-center gap-4">
                        <Link href="/" className="group flex flex-col items-center md:items-start justify-center w-fit">
                            <span ref={nameRef} className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                                Avesh Raj Singh
                            </span>
                            <span ref={subtitleRef} className="text-[10px] font-bold text-neutral-500 tracking-wide uppercase mt-0.5 md:ml-11 group-hover:text-blue-500 transition-colors">
                                Fullstack Developer
                            </span>
                        </Link>
                    </div>

                    {/* 2. Center Links Section (Desktop Only) */}
                    <nav
                        ref={linksContainerRef}
                        className="hidden md:flex items-center relative flex-1 justify-center"
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={indicatorRef}
                            className="absolute top-0 bottom-0 left-0 bg-neutral-200/80 dark:bg-white/10 rounded-2xl opacity-0 pointer-events-none"
                        />
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="nav-link-item relative z-10 px-6 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
                                onMouseEnter={handleMouseEnter}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* 3. CTA Button (Desktop Only) */}
                    <div ref={ctaRef} className="hidden md:flex flex-1 justify-end">
                        <motion.a
                            href="#contact"
                            onClick={handleScrollToContact}
                            style={{ x: springX, y: springY }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold text-sm overflow-hidden group shadow-lg shadow-blue-500/20 cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Let's Talk
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                            <span className="absolute inset-0 z-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Bottom Mobile Dock */}
            <div
                ref={mobileDockRef}
                className={`fixed bottom-6 left-4 right-4 z-50 flex md:hidden justify-center transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-[200%]"}`}
            >
                <nav
                    className={cn(
                        "flex items-center justify-between w-full max-w-sm px-2 py-2 rounded-3xl shadow-2xl relative transition-colors duration-300",
                        isExperiencePage
                            ? "bg-black/90 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-md"
                            : "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200/50 dark:border-white/10"
                    )}
                    onMouseLeave={handleMobileLeave}
                >
                    {/* Shared Background Indicator (Mobile) */}
                    <div
                        ref={mobileIndicatorRef}
                        className="absolute top-2 bottom-2 left-0 bg-neutral-200/80 dark:bg-white/10 rounded-2xl opacity-0 pointer-events-none"
                    />

                    {/* Nav Items */}
                    {[...navLinks, { name: "Talk", href: "#contact", icon: MessageCircle }].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                if (link.href === "#contact") handleScrollToContact(e);
                            }}
                            className="mobile-nav-item relative z-10 flex flex-col items-center justify-center w-full py-2 gap-1 text-neutral-600 dark:text-neutral-400 active:text-blue-500 transition-colors"
                            // Use onClick/Touch for mobile? Hover works for hybrid, but active state is key.
                            onMouseEnter={handleMobileEnter}
                            onTouchStart={(e) => {
                                // Simulate hover for touch
                                // Need to cast to unknown then anchor to make TS happy or just use currentTarget
                                const target = e.currentTarget as unknown as HTMLAnchorElement;
                                if (mobileIndicatorRef.current && mobileDockRef.current) {
                                    moveIndicator(target, mobileIndicatorRef.current, mobileDockRef.current);
                                }
                            }}
                        >
                            <link.icon className="w-5 h-5" />
                            {/* Optional: Show label like standard bottom nav? Or just icons?
                                User said "add icon for skill project and expirence and let's talk". 
                                Usually bottom nav has labels for clarity. Let's add tiny labels.
                            */}
                            <span className="text-[10px] font-medium">{link.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};
