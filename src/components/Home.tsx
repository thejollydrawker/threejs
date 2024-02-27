import React, { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber"
import Loader from "./Loader";
import Earth from "./canvas/Earth";
import Popup from "./Popup";

const Home = () => {
    const [isRotating, setIsRotating] = useState();
    const [currentStage, setCurrentStage] = useState(1);
    const adjustPlanetForScreenSize = () => {
        let screenScale: number[];
        let screenPosition = [0, -0.5, 1];

        if (window.innerWidth < 768) {
            screenScale = [1.25, 1.25, 1.25];
        } else
            screenScale = [2, 2, 2];

        return [screenScale, screenPosition];
    }

    const [planetScale, planetPosition] = adjustPlanetForScreenSize();

    return (
        <section className="h-screen w-full bg-slate-900">

            <div className="absolute top-20 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <Popup currentStage={currentStage} />}
            </div>
            <Canvas
                className={`w-ful h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[0,0,0]} intensity={2}></directionalLight>
                    <ambientLight intensity={3}></ambientLight>
                    <hemisphereLight></hemisphereLight>

                    <Earth
                        position={planetPosition}
                        scale={planetScale}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home