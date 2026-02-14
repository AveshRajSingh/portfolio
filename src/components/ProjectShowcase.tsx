"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        category: "Web Application",
        description: "A comprehensive dashboard for managing online stores with real-time analytics.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=E-Commerce+Dashboard", // Placeholder
        color: "bg-blue-600",
    },
    {
        id: 2,
        title: "AI Chat Assistant",
        category: "Artificial Intelligence",
        description: "Smart conversational interface powered by LLMs with context awareness.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=AI+Chatbot", // Placeholder
        color: "bg-purple-600",
    },
    {
        id: 3,
        title: "Finance Tracker",
        category: "Mobile App",
        description: "Personal finance management with intuitive visualizations and budget planning.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=Finance+App", // Placeholder
        color: "bg-green-600",
    },
    {
        id: 4,
        title: "Social Connect",
        category: "Social Platform",
        description: "Connecting communities through shared interests and real-time events.",
        image: "https://placehold.co/800x600/1e1e1e/FFF.png?text=Social+Platform", // Placeholder
        color: "bg-pink-600",
    },
];

export const ProjectShowcase = () => {
    return (
        <section className="py-24 px-4 md:px-6 bg-neutral-950 text-white">
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: project.id * 0.1 }}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 transition-all duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0">
                                {/* Using next/image would be better if we had local assets, using img for remote placeholder */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm text-white border border-white/10`}>
                                            {project.category}
                                        </span>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                            <div className="p-3 bg-white rounded-full text-neutral-900">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>

                                    <p className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 delay-75">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
