import React, { Suspense } from "react";

import { Canvas } from "@react-three/fiber"
import Loader from "./Loader";

const Home = () => {
    return (
        <section>
            <Canvas
                className="w-ful h-screen bg-transparent"
                camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight></directionalLight>
                    <ambientLight></ambientLight>
                    <pointLight></pointLight>
                    <spotLight></spotLight>
                    <hemisphereLight></hemisphereLight>
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home