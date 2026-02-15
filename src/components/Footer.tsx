"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
    Code,
    Terminal,
    Mail,
    Phone
} from "lucide-react";

const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/the_rishu_rajput_9/" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1HmStFUA61/" },
    { name: "X (Twitter)", icon: Twitter, href: "https://x.com/rishu_developer" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/avesh-web-dev" },
    { name: "LeetCode", icon: Code, href: "https://leetcode.com/u/RishuSingh01/" },
    { name: "GeeksforGeeks", icon: Terminal, href: "https://www.geeksforgeeks.org/profile/aveshrajspby" },
];

const topSkills = [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Node.js", "GSAP", "TERRAFORM", "ANSIBLE", "AWS"
];

export const Footer = () => {
    const pathname = usePathname();
    const isExperiencePage = pathname === "/experience";

    return (
        <footer className={`pt-20 pb-10 border-t transition-colors duration-300 ${isExperiencePage
            ? "bg-black border-green-500/30 font-mono text-green-500"
            : "bg-neutral-950 border-white/5 text-neutral-400"
            }`}>
            <div className="container mx-auto px-4 md:px-6">

                {/* --- Section 1: Contact Form (Full Width / Centered) --- */}
                <div id="contact" className="max-w-3xl mx-auto mb-20 scroll-mt-24">
                    <div className="text-center mb-10">
                        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isExperiencePage ? "text-green-500" : "text-white"}`}>
                            Let's work together
                        </h2>
                        <p className={`text-sm md:text-base ${isExperiencePage ? "text-green-500/70" : "text-neutral-400"}`}>
                            Have a project in mind? Fill out the form below and I'll get back to you shortly.
                        </p>
                    </div>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold uppercase tracking-wider ${isExperiencePage ? "text-green-500/60" : "text-neutral-500"}`}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors ${isExperiencePage
                                        ? "border-green-500/30 focus:border-green-500 text-green-500 placeholder-green-500/20"
                                        : "border-white/10 focus:border-white text-white placeholder-neutral-600"
                                        }`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold uppercase tracking-wider ${isExperiencePage ? "text-green-500/60" : "text-neutral-500"}`}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="jane@example.com"
                                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors ${isExperiencePage
                                        ? "border-green-500/30 focus:border-green-500 text-green-500 placeholder-green-500/20"
                                        : "border-white/10 focus:border-white text-white placeholder-neutral-600"
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={`text-xs font-semibold uppercase tracking-wider ${isExperiencePage ? "text-green-500/60" : "text-neutral-500"}`}>
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Tell me about your project..."
                                className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors resize-none ${isExperiencePage
                                    ? "border-green-500/30 focus:border-green-500 text-green-500 placeholder-green-500/20"
                                    : "border-white/10 focus:border-white text-white placeholder-neutral-600"
                                    }`}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                className={`px-10 py-3 text-sm font-bold tracking-widest transition-all rounded-full ${isExperiencePage
                                    ? "bg-green-500/10 text-green-500 border border-green-500 hover:bg-green-500 hover:text-black rounded-none" // Terminal style button (sharp corners optional, but fits theme)
                                    : "bg-white text-black hover:bg-neutral-200"
                                    }`}
                            >
                                {isExperiencePage ? "[ SEND_MESSAGE ]" : "SEND MESSAGE"}
                            </button>
                        </div>
                    </form>
                </div>


                {/* --- Section 2: Info Grid (3 Columns) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16 border-t pt-16 border-white/5">

                    {/* Col 1: Top Skills */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h3 className={`text-lg font-semibold tracking-tight ${isExperiencePage ? "text-green-500" : "text-white"}`}>Top Skills</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {topSkills.map((skill, index) => (
                                <span
                                    key={index}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors cursor-default ${isExperiencePage
                                        ? "bg-green-500/10 border-green-500/30 text-green-500 hover:bg-green-500/20"
                                        : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/10 hover:text-white"
                                        }`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Contact Info */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="text-center">
                            <h2 className={`text-2xl font-bold tracking-tight mb-1 ${isExperiencePage ? "text-green-500" : "text-white"}`}>Avesh Raj Singh</h2>
                            <p className={`text-sm ${isExperiencePage ? "text-green-500/70" : "text-neutral-500"}`}>Fullstack Developer & UI/UX Designer</p>
                        </div>
                        <div className={`flex flex-col items-center gap-2 text-sm ${isExperiencePage ? "text-green-500/70" : "text-neutral-400"}`}>
                            <a href="mailto:aveshrajsingh3@gmail.com" className={`flex items-center gap-2 transition-colors ${isExperiencePage ? "hover:text-green-400" : "hover:text-white"}`}>
                                <Mail className="w-4 h-4" />
                                <span>aveshrajsingh3@gmail.com</span>
                            </a>
                            <a href="tel:+916205683736" className={`flex items-center gap-2 transition-colors ${isExperiencePage ? "hover:text-green-400" : "hover:text-white"}`}>
                                <Phone className="w-4 h-4" />
                                <span>+91 6205683736</span>
                            </a>
                        </div>
                    </div>

                    {/* Col 3: Socials */}
                    <div className="flex flex-col items-center md:items-end space-y-4">
                        <h3 className={`text-lg font-semibold tracking-tight ${isExperiencePage ? "text-green-500" : "text-white"}`}>Connect</h3>
                        <div className="flex flex-wrap justify-center md:justify-end gap-3">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 rounded-full transition-colors border ${isExperiencePage
                                        ? "bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20 hover:border-green-500"
                                        : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white hover:text-black hover:border-white"
                                        }`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${isExperiencePage ? "border-green-500/30 text-green-500/60" : "border-white/5 text-neutral-600"
                    }`}>
                    <p>&copy; {new Date().getFullYear()} Avesh Raj Singh. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className={`transition-colors ${isExperiencePage ? "hover:text-green-400" : "hover:text-neutral-400"}`}>Privacy Policy</Link>
                        <Link href="/terms" className={`transition-colors ${isExperiencePage ? "hover:text-green-400" : "hover:text-neutral-400"}`}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
