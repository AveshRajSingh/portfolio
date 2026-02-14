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

                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                project={{
                                    ...project,
                                    technologies: project.technologies,
                                    links: {
                                        demo: project.links.demo,
                                        github: project.links.github,
                                    },
                                    image: project.image,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
