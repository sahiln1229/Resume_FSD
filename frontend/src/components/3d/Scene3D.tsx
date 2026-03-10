"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) {
    const mesh = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (!mesh.current) return;
        const t = state.clock.getElapsedTime();

        // Base floating animation
        mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.2;

        // Mouse reaction (inertia follow)
        mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, position[0] + mouse.x * 2, 0.05);
        mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, position[2] + mouse.y * 1.5, 0.05);

        mesh.current.rotation.x = Math.cos(t * speed) * 0.1;
        mesh.current.rotation.y = Math.sin(t * speed) * 0.1;
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={mesh} position={position} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={0.6}
                    roughness={0.1}
                    metalness={0.9}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </Sphere>
        </Float>
    );
}

export default function Scene3D() {
    return (
        <div className="scene-container">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <AbstractShape position={[-6, 3, 0]} color="#1E3A8A" speed={1.5} distort={0.4} />
                <AbstractShape position={[7, -2, -2]} color="#3B82F6" speed={2} distort={0.3} />
                <AbstractShape position={[-2, -5, 1]} color="#64748B" speed={1} distort={0.2} />
                <AbstractShape position={[4, 5, -3]} color="#1E3A8A" speed={1.2} distort={0.5} />
            </Canvas>
        </div>
    );
}
