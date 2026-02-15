"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
    project: {
        id: number | string;
        title: string;
        description: string;
        technologies: string[];
        links: {
            demo: string;
            github: string;
        };
        image: string;
    };
    features?: string[];
    index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, features, index }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center p-4 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group relative">
            {/* Visual Area (Left) - Hidden on mobile */}
            <div className="hidden md:block relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 project-image-container h-full">
                {/* Placeholder for high-res project screenshot */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out project-image"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
            </div>

            {/* Content Area (Right) */}
            <div className="flex flex-col justify-between h-full space-y-6 relative z-10">
                {/* Decoration: Large Index Number */}
                {index && (
                    <div className="absolute -top-4 -right-4 text-9xl font-bold text-white/5 select-none pointer-events-none z-0">
                        {index.toString().padStart(2, '0')}
                    </div>
                )}

                <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 project-title tracking-tight">
                        {project.title}
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed project-description mb-6">
                        {project.description}
                    </p>

                    {/* Key Features Section */}
                    {features && features.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Key Features</h3>
                            <ul className="grid grid-cols-1 gap-2">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-neutral-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex flex-wrap gap-2 project-tech-stack">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 pt-2 project-links">
                        <Link
                            href={project.links.demo}
                            target="_blank"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-neutral-950 rounded-full font-bold hover:bg-neutral-200 transition-colors text-sm"
                        >
                            Live Demo
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href={project.links.github}
                            target="_blank"
                            className="p-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
                            aria-label="View Source on GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
