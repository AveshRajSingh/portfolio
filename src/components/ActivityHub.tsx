"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowRight, Star, GitCommit } from "lucide-react";

export const ActivityHub = () => {
    return (
        <section className="py-24 bg-neutral-950 text-white overflow-hidden">
            {/* Marquee Section */}
            <div className="mb-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 z-10 pointer-events-none" />
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="flex whitespace-nowrap gap-8 text-neutral-800 font-bold text-6xl md:text-8xl select-none"
                >
                    <span>CURRENTLY BUILDING</span>
                    <span className="text-neutral-700">///</span>
                    <span>LEARNING RUST</span>
                    <span className="text-neutral-700">///</span>
                    <span>OPEN SOURCE</span>
                    <span className="text-neutral-700">///</span>
                    <span>CURRENTLY BUILDING</span>
                    <span className="text-neutral-700">///</span>
                    <span>LEARNING RUST</span>
                    <span className="text-neutral-700">///</span>
                    <span>OPEN SOURCE</span>
                    <span className="text-neutral-700">///</span>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-2"
                >
                    <span className="w-2 h-8 bg-blue-500 rounded-full" />
                    Activity Log
                </motion.h2>

                {/* Bento Grid / Social Wall */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* LinkedIn Card */}
                    <motion.a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-[300px] hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-[#0077b5]/10 rounded-full text-[#0077b5]">
                                <Linkedin className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-blue-500 -rotate-45 group-hover:rotate-0 transition-transform" />
                        </div>

                        <div>
                            <p className="text-sm text-neutral-400 mb-2">Latest Post</p>
                            <h3 className="text-xl font-medium leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                                "Just shipped a new feature! The process of optimizing React performance..."
                            </h3>
                        </div>
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    </motion.a>

                    {/* GitHub Card */}
                    <motion.a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-[300px] hover:border-white/20 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-white/10 rounded-full text-white">
                                <Github className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400">
                                <Star className="w-4 h-4" /> 128
                                <GitCommit className="w-4 h-4 ml-2" /> 450+
                            </div>
                        </div>

                        {/* Mock Contribution Graph */}
                        <div className="flex gap-1 flex-wrap mt-auto">
                            {[...Array(28)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-green-500/80' : 'bg-neutral-800'}`}
                                />
                            ))}
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-medium text-white group-hover:underline decoration-neutral-500 underline-offset-4">
                                @rishusingh
                            </h3>
                        </div>
                    </motion.a>

                    {/* Instagram Card */}
                    <motion.a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-[300px] hover:border-pink-500/50 transition-colors overflow-hidden"
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div className="p-3 bg-pink-500/10 rounded-full text-pink-500">
                                <Instagram className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-pink-500 -rotate-45 group-hover:rotate-0 transition-transform" />
                        </div>

                        {/* Image Placeholder */}
                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-neutral-800 group-hover:scale-110 transition-transform duration-500">
                            <img src="https://placehold.co/400x300/262626/FFF.png?text=Creative+Shot" alt="Insta" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="relative z-10 mt-4 pointer-events-none">
                            {/* Spacer */}
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};
