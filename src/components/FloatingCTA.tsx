"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const FloatingCTA = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { scrollY } = useScroll();

    // GSAP Magnetic Logic
    useEffect(() => {
        if (!buttonRef.current) return;

        const button = buttonRef.current;
        const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // Magnetic Range: 150px
            if (distance < 150) {
                // Snap Range: 60px
                if (distance < 60) {
                    xTo(0);
                    yTo(0);
                } else {
                    // Follow Logic
                    xTo(distanceX * 0.3);
                    yTo(distanceY * 0.3);
                }
            } else {
                xTo(0);
                yTo(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll Logic: Hide when at the very top (optional, but good if Navbar has one)
    // Actually, user wants it "on every page". 
    // Let's keep it always visible or maybe hide if Navbar CTA is visible?
    // Navbar CTA is visible on Desktop Top. 
    // If we have two "Let's Talk" buttons it might be weird.
    // But for now, let's just make it a fixed global element.

    return (
        <div className="fixed bottom-8 right-8 z-[90] md:z-[100]">
            <button
                ref={buttonRef}
                onClick={() => window.location.href = "mailto:contact@example.com"}
                className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Let's Talk"
            >
                <MessageCircle className="w-8 h-8 relative z-10" />

                {/* Optional Ripple/Glow */}
                <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
        </div>
    );
};
