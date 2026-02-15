"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Download, Cpu, Server, Database, Globe } from "lucide-react";

const leftLogs = [
    "[sys] core_logic.so loaded: DSA, OS, DBMS, Networks",
    "[sys] terraform plan: 0 to add, 0 to change, 0 to destroy.",
    "[sys] aws_ec2_instance.career: status = 'pending_hire'",
    "[sys] ansible-playbook: setup_professional_growth.yml ... [OK]",
];

const rightHooks = [
    "// TODO: Replace 'Fresher' with 'Lead Dev' once hired.",
    "// NOTE: This dev is highly scalable.",
    "\"local build stable; need prod env.\"",
];

// Helper for typing text line by line
const TypingLine = ({ text, delay, onComplete }: { text: string; delay: number; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }
            }, 30); // Typing speed
            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [text, delay, onComplete]);

    return <div>{displayedText}</div>;
};

export const Experience404 = () => {
    const [mainText, setMainText] = useState("");
    const fullText = "Experience not found...";
    const [showCursor, setShowCursor] = useState(true);
    const [logsFinished, setLogsFinished] = useState(false);

    // Main Typing Effect
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setMainText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    // Blinking Cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    // Handle Log Completion
    const handleLogsComplete = () => {
        // Small delay before showing button
        setTimeout(() => setLogsFinished(true), 500);
    };

    return (
        <section
            id="experience"
            className="relative min-h-screen w-full overflow-hidden bg-black font-mono text-green-500 selection:bg-green-500/30 selection:text-green-100 cursor-text grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-8"
        >
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
            </div>

            {/* LEFT COLUMN: DevOps Logs (Hidden on Mobile) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-end pb-20 text-[10px] lg:text-xs opacity-70 space-y-3 z-10 pl-4 border-l border-green-500/10">
                {leftLogs.map((log, index) => (
                    <TypingLine
                        key={index}
                        text={log}
                        delay={index * 1.5} // Staggered start
                        onComplete={index === leftLogs.length - 1 ? handleLogsComplete : undefined}
                    />
                ))}
            </div>

            {/* CENTER COLUMN: Main Content */}
            <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center text-center z-20 relative">

                {/* System Header */}
                <div className="w-full max-w-lg mb-8 border-b border-green-500/30 pb-2 flex justify-between items-center text-[10px] tracking-wider opacity-60">
                    <span>SYSTEM_STATUS: CRITICAL</span>
                    <span>MEM: 64KB OK</span>
                </div>

                {/* 404 & Main Message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold leading-none tracking-tighter text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                >
                    404
                </motion.div>

                <div className="mt-4 text-xl md:text-2xl font-medium tracking-wide h-8 flex items-center justify-center">
                    <span className="mr-2 text-green-400 opacity-50">{">"}</span>
                    {mainText}
                    <span className={`${showCursor ? "opacity-100" : "opacity-0"} ml-1 w-2 h-6 bg-green-500 block`} />
                </div>

                <p className="mt-4 text-green-500/60 max-w-md text-sm leading-relaxed">
           // ERROR: No professional history detected.<br />
           // ACTION: Initialize 'career_mode'.
                </p>

                {/* SYSTEM SPECS */}
                <div className="mt-10 grid grid-cols-2 gap-4 text-xs font-mono border border-green-500/20 p-4 rounded bg-green-500/5 max-w-sm w-full">
                    <div className="col-span-2 text-center border-b border-green-500/20 pb-2 mb-2 font-bold tracking-widest opacity-80">
                        SYSTEM_SPECS
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Next.js / Node
                    </div>
                    <div className="flex items-center gap-2">
                        <Server className="w-3 h-3" /> AWS (EC2/S3)
                    </div>
                    <div className="flex items-center gap-2">
                        <Cpu className="w-3 h-3" /> Terraform
                    </div>
                    <div className="flex items-center gap-2">
                        <Database className="w-3 h-3" /> Ansible/Docker
                    </div>
                </div>

                {/* BUTTONS CONTAINER */}
                <div className="mt-12 flex flex-col items-center gap-4 w-full">
                    {/* Primary Hire Action */}
                    <motion.a
                        href="mailto:contact@example.com"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 px-8 py-3 border border-green-500 text-green-500 font-bold text-sm tracking-widest hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all bg-black"
                    >
                        <Terminal className="w-4 h-4" />
                        <span>[ INITIATE_HIRE_PROTOCOL ]</span>
                    </motion.a>

                    {/* Conditional Resume Button */}
                    <AnimatePresence>
                        {(
                            <motion.a
                                href="/assets/Avesh_resume.pdf"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-xs text-green-500/70 hover:text-green-400 border-b border-transparent hover:border-green-400 transition-colors flex items-center gap-2 cursor-pointer pt-2"
                                download
                            >
                                <Download className="w-3 h-3" />
                                [ RESUME.PDF ]
                            </motion.a>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* RIGHT COLUMN: Witty Hooks (Hidden on Mobile) */}
            <div className="hidden md:flex md:col-span-3 flex-col justify-start pt-32 text-[10px] lg:text-xs opacity-50 italic space-y-6 z-10 text-right pr-4 border-r border-green-500/10">
                {rightHooks.map((hook, index) => (
                    <TypingLine key={index} text={hook} delay={2 + index * 2} />
                ))}
            </div>
        </section>
    );
};
