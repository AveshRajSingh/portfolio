"use client";

import React, { useRef, useState, useLayoutEffect, useEffect, forwardRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Text,
    Float,
    Stars,
    Sphere,
    MeshDistortMaterial,
    Line,
    Box,
    Torus,
    Octahedron,
    Cylinder,
    Ring,
    Billboard,
    OrbitControls
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { Code, Layout, Server, Database } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Types ---
type SkillItem = {
    name: string;
    color: string;
    type: "lang" | "framework" | "cloud" | "db";
};

type Category = {
    id: string;
    label: string;
    skills: SkillItem[];
    icon: any;
};

// --- Data ---
const SKILLS_DATA: Category[] = [
    {
        id: "languages",
        label: "LANGUAGES",
        icon: Code,
        skills: [
            { name: "JavaScript", color: "#f7df1e", type: "lang" },
            { name: "TypeScript", color: "#3178c6", type: "lang" },
            { name: "Python", color: "#3776ab", type: "lang" },
            { name: "HTML5", color: "#e34f26", type: "lang" },
            { name: "CSS3", color: "#264de4", type: "lang" },
        ]
    },
    {
        id: "frameworks",
        label: "FRAMEWORKS",
        icon: Layout,
        skills: [
            { name: "React", color: "#61dafb", type: "framework" },
            { name: "Next.js", color: "#ffffff", type: "framework" },
            { name: "Node.js", color: "#339933", type: "framework" },
            { name: "Tailwind", color: "#38bdf8", type: "framework" },
            { name: "Express", color: "#ffffff", type: "framework" },
        ]
    },
    {
        id: "cloud",
        label: "CLOUD / DEVOPS",
        icon: Server,
        skills: [
            { name: "AWS", color: "#f97316", type: "cloud" },
            { name: "Docker", color: "#2496ed", type: "cloud" },
            { name: "Terraform", color: "#7b42bc", type: "cloud" },
            { name: "Ansible", color: "#ee0000", type: "cloud" },
            { name: "Jenkins", color: "#d24939", type: "cloud" },
        ]
    },
    {
        id: "db",
        label: "TOOLS&DB",
        icon: Database,
        skills: [
            { name: "MongoDB", color: "#47a248", type: "db" },
            { name: "PostgreSQL", color: "#336791", type: "db" },
            { name: "Redis", color: "#dc382d", type: "db" },
            { name: "Firebase", color: "#ffca28", type: "db" },
            { name: "Git", color: "#f1502f", type: "db" },
        ]
    }
];

// --- 3D Components ---

const GeometricIcon = ({ type, color }: { type: string, color: string }) => {
    return (
        <group>
            {type === "cloud" && (
                <group scale={0.4}>
                    <Box args={[1, 1, 1]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Box>
                </group>
            )}
            {type === "framework" && (
                <group scale={0.3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <Torus args={[1, 0.2, 16, 32]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Torus>
                </group>
            )}
            {type === "lang" && (
                <group scale={0.5}>
                    <Octahedron args={[1, 0]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Octahedron>
                </group>
            )}
            {type === "db" && (
                <group scale={0.4}>
                    <Cylinder args={[1, 1, 1.5, 8]}>
                        <meshStandardMaterial color={color} wireframe />
                    </Cylinder>
                </group>
            )}
        </group>
    )
}

// The individual orbiting planet
const MorphingNode = forwardRef<THREE.Group, {
    skill: SkillItem,
    index: number,
    total: number
}>(({ skill, index, total }, ref) => {
    // User fix: any to solve TS issue
    const materialRef = useRef<any>(null);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.color.lerp(new THREE.Color(skill.color), delta * 3);
            materialRef.current.emissive.lerp(new THREE.Color(skill.color), delta * 3);
        }
    });

    return (
        <group ref={ref}>
            <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
                {/* Main Sphere */}
                <Sphere args={[0.6, 32, 32]}>
                    <MeshDistortMaterial
                        ref={materialRef}
                        color={skill.color}
                        emissive={skill.color}
                        emissiveIntensity={0.5} // Lower intensity so text is readable
                        distort={0.4}
                        speed={3}
                        transparent
                        opacity={0.2}
                        wireframe
                    />
                </Sphere>

                {/* Inner Icon */}
                <GeometricIcon key={`${skill.type}-${skill.name}`} type={skill.type} color={skill.color} />

                {/* Text Label - Billboarded to face camera */}
                <Billboard position={[0, 0.9, 0]}>
                    <Text
                        fontSize={0.3}
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.02}
                        outlineColor="#000000"
                        renderOrder={10}
                        // @ts-ignore
                        depthTest={false}
                    >
                        {skill.name}
                    </Text>
                </Billboard>
            </Float>
        </group>
    );
});
MorphingNode.displayName = "MorphingNode";


// The Central Sun (Category Label)
const CentralSun = ({ label, color }: { label: string, color: string }) => {
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.color.lerp(new THREE.Color(color), delta * 2);
            materialRef.current.emissive.lerp(new THREE.Color(color), delta * 2);
        }
    });

    return (
        <group>
            {/* Glowing Core */}
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial
                    ref={materialRef}
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </Sphere>
            <pointLight distance={10} intensity={2} color="white" />

            {/* Label */}
            <Billboard>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                    fontWeight="bold"
                    letterSpacing={0.1}
                >
                    {label}
                </Text>
            </Billboard>
        </group>
    );
};


// --- Joystick Component ---
const Joystick = ({ onChange }: { onChange: (data: { x: number, y: number }) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
        setActive(true);
        handleMove(e);
    };

    const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!active && e.type !== 'touchstart' && e.type !== 'mousedown') return;
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxRadius = containerRect.width / 2;

        let x = deltaX;
        let y = deltaY;

        if (distance > maxRadius) {
            const angle = Math.atan2(deltaY, deltaX);
            x = Math.cos(angle) * maxRadius;
            y = Math.sin(angle) * maxRadius;
        }

        setPosition({ x, y });

        // Normalize output (-1 to 1)
        onChange({ x: x / maxRadius, y: y / maxRadius });
    };

    const handleEnd = () => {
        setActive(false);
        setPosition({ x: 0, y: 0 });
        onChange({ x: 0, y: 0 });
    };

    useEffect(() => {
        if (active) {
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchend', handleEnd);
            // window.addEventListener('mousemove', handleMove as any); // handled by container for tighter control? No, window is better for dragging out
            // Actually for a simple joystick, binding to container is safer for scrolling page if user slips off?
            // But we want to drag outside too?
            // Let's stick to container events for simplicity and to allow page scroll if they miss it.
        }
        return () => {
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchend', handleEnd);
        }
    }, [active]);


    return (
        <div
            ref={containerRef}
            className="w-24 h-24 rounded-full bg-neutral-800/80 border border-white/20 backdrop-blur-md relative touch-none flex items-center justify-center shadow-lg"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
        >
            <div
                ref={knobRef}
                className="w-10 h-10 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] absolute transition-transform duration-75"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: active ? 'none' : 'transform 0.1s ease-out'
                }}
            />
        </div>
    );
}


const Scene = ({ activeIndex, scrollProgress, joystickRef }: { activeIndex: number, scrollProgress: number, joystickRef: React.MutableRefObject<{ x: number, y: number }> }) => {
    const [displayedIndex, setDisplayedIndex] = useState(activeIndex);

    // Timeline ref to handle interruptions
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const { viewport, camera } = useThree();
    const isMobile = viewport.width < 7.68;

    const systemGroupRef = useRef<THREE.Group>(null);
    const orbitGroupRef = useRef<THREE.Group>(null);
    const nodeRefs = useRef<(THREE.Group | null)[]>([]);

    // Rotation of the entire system
    useFrame((state, delta) => {
        // 1. Constant Orbit (Skills orbiting the center)
        if (orbitGroupRef.current) {
            orbitGroupRef.current.rotation.y += delta * 0.2;
        }

        // 2. System Orientation (Joystick Control or Reset)
        if (systemGroupRef.current) {
            if (isMobile && joystickRef.current) {
                // Joystick controls the WHOLE system orientation
                // X -> Y rotation (Yaw)
                systemGroupRef.current.rotation.y += joystickRef.current.x * delta * 6;
                // Y -> X rotation (Pitch)
                systemGroupRef.current.rotation.x += joystickRef.current.y * delta * 6;

                // Clamp X rotation to avoid flipping
                systemGroupRef.current.rotation.x = THREE.MathUtils.clamp(systemGroupRef.current.rotation.x, -0.5, 0.5);
            } else if (!isMobile) {
                // On Desktop, reset tilt to 0 to ensure perfect alignment with default view
                // We Lerp for smoothness in case of resizing window
                systemGroupRef.current.rotation.x = THREE.MathUtils.lerp(systemGroupRef.current.rotation.x, 0, delta * 5);
                systemGroupRef.current.rotation.z = THREE.MathUtils.lerp(systemGroupRef.current.rotation.z, 0, delta * 5);
            }
        }
    });

    // --- Camera Positioning for Responsive View ---
    useEffect(() => {
        if (isMobile) {
            // Mobile: Top Down View
            gsap.to(camera.position, {
                x: 0,
                y: 16,
                z: 0.1, // Slight offset to avoid gimbal lock
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => camera.lookAt(0, 0, 0)
            });
        } else {
            // Desktop: Tilted Front View
            gsap.to(camera.position, {
                x: 0,
                y: 6,
                z: 15,
                duration: 1.5,
                ease: "power3.inOut",
                onUpdate: () => camera.lookAt(0, 0, 0)
            });
        }
    }, [isMobile, camera]);


    // --- Animation Logic ---
    useEffect(() => {
        // If the active index matches displayed, we don't need to do anything 
        // unless we want to initialize positions on mount?
        // But on mount active=0, displayed=0. 
        if (activeIndex === displayedIndex) return;

        // Kill previous timeline to stop conflicting animations
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline();
        timelineRef.current = tl;

        // 1. Exit Animation for CURRENT nodes (displayedIndex)
        // Randomize exit order
        const exitIndices = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);

        exitIndices.forEach((i) => {
            const node = nodeRefs.current[i];
            if (node) {
                // Fly UP and shrink
                tl.to(node.position, {
                    y: 10,
                    duration: 0.4,
                    ease: "power2.in"
                }, i * 0.05); // Rapid stagger

                tl.to(node.scale, {
                    x: 0, y: 0, z: 0,
                    duration: 0.4
                }, "<");
            }
        });

        // 2. Switch Data (Mid-timeline)
        tl.call(() => {
            setDisplayedIndex(activeIndex);
        });

        // 3. Reset & Enter Animation
        // This runs after the switch, so MorphingNode components should have updated to new skills
        const enterStep = () => {
            const enterTl = gsap.timeline();
            const nodes = nodeRefs.current;

            // Immediate Reset before animating in
            nodes.forEach(node => {
                if (node) {
                    node.position.y = 10;
                    node.scale.set(0, 0, 0);
                }
            });

            const dropIndices = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);
            dropIndices.forEach((i) => {
                const node = nodes[i];
                if (node) {
                    enterTl.to(node.position, {
                        y: 0,
                        duration: 1.0,
                        ease: "bounce.out"
                    }, i * 0.1);
                    enterTl.to(node.scale, {
                        x: 1, y: 1, z: 1,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    }, "<");
                }
            });
        };

        // Add Enter step to main timeline
        tl.to({}, { duration: 0.1, onComplete: enterStep });

    }, [activeIndex, displayedIndex]);


    const activeCategory = SKILLS_DATA[displayedIndex];
    const orbitRadius = isMobile ? 3.5 : 5;

    // Calculate positions evenly distributed on the circle
    const getOrbitPosition = (index: number, total: number) => {
        const angle = (index / total) * Math.PI * 2;
        return {
            x: Math.cos(angle) * orbitRadius,
            z: Math.sin(angle) * orbitRadius,
            rotation: -angle
        };
    };

    // Pick color for Sun from the first skill of the category
    const categoryColor = activeCategory.skills[0].color;

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

            {/* Added OrbitControls for interaction, disabled on Mobile when using Joystick */}
            {!isMobile && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.05}
                    rotateSpeed={0.5}
                />
            )}

            {/* Main Solar System Group */}
            {/* Rotation set to 0, camera handles view angle */}
            <group
                ref={systemGroupRef}
                rotation={[0, 0, 0]}
                position={[0, 0, 0]}
            >
                {/* Visual Ring */}
                <Ring args={[orbitRadius - 0.05, orbitRadius + 0.05, 64]} rotation={[-Math.PI / 2, 0, 0]} >
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
                </Ring>

                {/* Central Sun */}
                <CentralSun label={activeCategory.label} color={categoryColor} />

                {/* Orbiting Skills */}
                <group ref={orbitGroupRef}>
                    {activeCategory.skills.map((skill, index) => {
                        const pos = getOrbitPosition(index, 5);
                        return (
                            <group
                                key={index}
                                position={[pos.x, 0, pos.z]}
                            >
                                <group
                                    ref={(el) => { nodeRefs.current[index] = el; }}
                                >
                                    <MorphingNode
                                        skill={skill}
                                        index={index}
                                        total={5}
                                    />
                                </group>
                            </group>
                        );
                    })}
                </group>
            </group>
        </>
    );
};

export function Skills3D() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Joystick State Ref
    const joystickRef = useRef({ x: 0, y: 0 });

    // Initialize GSAP ScrollTrigger
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        // Desktop Scroll Logic
        mm.add("(min-width: 768px)", () => {
            const trigger = ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                end: `+=300%`,
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress;
                    setScrollProgress(p);
                    const index = Math.min(
                        Math.floor(p * SKILLS_DATA.length),
                        SKILLS_DATA.length - 1
                    );
                    setActiveIndex((prev) => (prev !== index ? index : prev));
                }
            });
            return () => trigger.kill();
        });

        // Mobile Logic
        mm.add("(max-width: 767px)", () => {
            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => setScrollProgress(self.progress)
            });
        });

        return () => mm.revert();
    }, []);

    const handleCategoryClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section ref={triggerRef} className="relative w-full h-[100dvh] bg-neutral-950 text-white overflow-hidden flex flex-col md:flex-row">
            {/* LEFT: Command Center List (Desktop Only) */}
            <div className="hidden md:flex w-[35%] h-full flex-col justify-center px-12 z-20 bg-neutral-950/80 backdrop-blur-sm border-r border-white/10">
                <h2 className="text-sm font-mono text-neutral-500 mb-8 tracking-widest uppercase">
                    {'//'} SYSTEM_MODULES
                </h2>

                <div className="flex flex-col gap-6">
                    {SKILLS_DATA.map((category, index) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(index)}
                            className={cn(
                                "skill-category-item p-4 border-l-2 transition-all duration-300 font-mono text-lg text-left w-full outline-none",
                                index === activeIndex
                                    ? "border-blue-500 text-blue-400 bg-blue-500/5 pl-6 scale-105"
                                    : "border-neutral-800 text-neutral-600 hover:text-neutral-400 pl-4"
                            )}
                        >
                            <span className="opacity-50 text-xs mr-3">0{index + 1}</span>
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* FULL: 3D Canvas */}


            {/* BOTTOM: Mobile Navigation Bar */}
            <div className="md:hidden absolute bottom-24 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-3 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                {SKILLS_DATA.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(index)}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1 min-w-[60px]",
                                index === activeIndex
                                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110"
                                    : "text-neutral-400 hover:text-white"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-[8px] font-bold uppercase tracking-wider mt-1">{category.id.slice(0, 4)}</span>
                        </button>
                    );
                })}
            </div>
            <div className="w-full md:w-[65%] h-full relative touch-pan-y">
                {/* Canvas Overlay Lines */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* 
                   Canvas needs to be able to capture pointer events for OrbitControls. 
                   Ensure z-index is correct relative to overlay. 
                   Overlay has z-10, pointer-events-none.
                   Mobile Nav has z-50.
                   So Canvas (default z-0) should be interactable.
                */}
                <Canvas camera={{ position: [0, 0, 16], fov: 45 }}>
                    <Scene activeIndex={activeIndex} scrollProgress={scrollProgress} joystickRef={joystickRef} />
                </Canvas>

                {/* Mobile Joystick (Visible only on Mobile) */}
                <div className="absolute bottom-[1px] left-1/2 -translate-x-1/2 z-40 md:hidden">
                    <Joystick onChange={(data) => { joystickRef.current = data; }} />
                </div>
            </div>
        </section>
    );
}
