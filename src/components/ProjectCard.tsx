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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center p-3 md:p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group">
            {/* Visual Area (Left) - Hidden on mobile */}
            <div className="hidden md:block relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 project-image-container">
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
            <div className="flex flex-col justify-center space-y-3 md:space-y-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-1 md:mb-2 project-title">
                        {project.title}
                    </h2>
                    <p className="text-neutral-400 text-xs md:text-sm leading-relaxed project-description">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:gap-2 project-tech-stack">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 md:gap-3 pt-1 md:pt-2 project-links">
                    <Link
                        href={project.links.demo}
                        target="_blank"
                        className="flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-neutral-950 rounded-full font-semibold hover:bg-neutral-200 transition-colors text-xs md:text-sm"
                    >
                        Live Demo
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>
                    <Link
                        href={project.links.github}
                        target="_blank"
                        className="p-2 md:p-2.5 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors"
                        aria-label="View Source on GitHub"
                    >
                        <Github className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
