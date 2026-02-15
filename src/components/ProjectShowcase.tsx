"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
    {
        id: "ambria",
        title: "Ambria",
        description: "A comprehensive e-commerce platform built for a high-end fashion brand, featuring real-time inventory management and a seamless checkout experience.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
        features: [
            "Real-time inventory synchronization",
            "Secure Stripe payment processing",
            "Admin dashboard for order management",
            "Responsive minimalist design"
        ],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/ambria.jpeg",
    },
    {
        id: "sitcoders",
        title: "SITcoders",
        description: "A collaborative coding platform designed for students to share resources, participate in hackathons, and build a community of developers.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
        features: [
            "Real-time code collaboration",
            "Hackathon management system",
            "Resource sharing repository",
            "Interactive student forums"
        ],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/sitcoders.jpeg",
    },
    {
        id: "typedev",
        title: "typeDev",
        description: "An interactive typing test application for developers, featuring code-based challenges and real-time performance analytics.",
        technologies: ["Vue.js", "Firebase", "Chart.js", "Tailwind CSS"],
        features: [
            "Code-syntax typing challenges",
            "Real-time WPM & accuracy analytics",
            "Multi-language code snippets",
            "Competitive leaderboards"
        ],
        links: {
            demo: "#", // Placeholder
            github: "#", // Placeholder
        },
        image: "/assets/typedev.png",
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

                <div className="">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="sticky mb-12 rounded-3xl bg-neutral-950 border border-white/5 shadow-2xl shadow-black/50"
                            style={{
                                top: `calc(7rem + ${index * 40}px)`,
                                zIndex: index + 1
                            }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                index={index + 1}
                                project={{
                                    ...project,
                                    technologies: project.technologies,
                                    links: {
                                        demo: project.links.demo,
                                        github: project.links.github,
                                    },
                                    image: project.image,
                                }}
                                features={project.features}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
