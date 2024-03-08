import React, { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber"
import Loader from "./Loader";
import Earth from "./canvas/Earth";
import Popup from "./Popup";

const BREAKPOINT = 768;

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [tooltipVisible, setTooltipVisible] = useState(true);
    let inactivityTimer: any;

    const adjustPlanetForScreenSize = () => {
        let screenScale: number[];
        let screenPosition = [0, -0.5, 1];
        const rotation = [0, 0.6, 0.4];

        if (window.innerWidth < BREAKPOINT) {
            screenScale = [1.25, 1.25, 1.25];
            screenPosition = [0, -1.5, 1];
        } else
            screenScale = [1.8, 1.8, 1.8];

        return [screenScale, screenPosition, rotation];
    }

    const getPopupPosition = () => {
        if (window.innerWidth > BREAKPOINT) {
          switch (currentStage) {
            case 1:
                return 'top-20 left-[37.5%]';
            case 2:
                return 'top-1/2 left-20';
            case 3:
                return 'bottom-1/3 right-20';
            default:
                break;
            }  
        }

        return 'top-20 left-0 right-0 mx-8';
    }

    const getTooltipPosition = () => {
        if (window.innerWidth > BREAKPOINT) {
          switch (currentStage) {
            case 1:
            case 2:
                return 'top-1/2 left-[70%]';
            case 3:
                return 'top-1/2 right-[70%]';
            default:
                break;
            }  
        }

        return 'top-[40%] left-0 right-0 mx-8 max-w-32';
    }

    useEffect(() => {
        const showTooltip = () => {
          setTooltipVisible(true);
        };
    
        const resetInactivityTimer = () => {
          setTooltipVisible(false);
          clearTimeout(inactivityTimer);
    
          inactivityTimer = setTimeout(() => {
            showTooltip();
          }, 1500);
        };
    
        window.addEventListener('click', resetInactivityTimer);
        window.addEventListener('touchstart', resetInactivityTimer);
    
        return () => {
          window.removeEventListener('click', resetInactivityTimer);
          window.removeEventListener('touchstart', resetInactivityTimer);
          // Clear the timer on unmount
          clearTimeout(inactivityTimer);
        };
    }, []);

    const [planetScale, planetPosition, planetRotation] = adjustPlanetForScreenSize();

    return (
        <section className="h-screen w-full canvas-container">
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{near: 0.1, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                    {
                        // no lights defined because the earth glb uses MeshBasicMaterial not MeshStandardMaterial
                        // possibly a TODO for the future to check out how that can be converted programatically
                    }
                    <Earth
                        position={planetPosition}
                        scale={planetScale}
                        rotation={planetRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                </Suspense>
            </Canvas>
            <div className={`absolute ${getPopupPosition()} p-5 rounded-md cursor-normal text-md tracking-wide flex items-center justify-center md:max-w-[25%] bg-gradient-to-t from-indigo-700 to-violet-500/70`}>
                {currentStage && <Popup currentStage={currentStage} />}
            </div>
            
            {tooltipVisible && <div className={`absolute ${getTooltipPosition()}`}><Tooltip orientation={ currentStage !== 3 && window.innerWidth > BREAKPOINT ? 'right' : 'left' }/></div>}
        </section>
    )
}

const Tooltip = ({orientation}: {orientation: string}) => {
    const placeTooltip = (orientation: string, position: string) => {
        if (orientation == 'left') {
            if(position === '1') {
                return `-right-1`;
            }
            return `-right-5`;
        } else {
            if(position === '1') {
                return `-left-1`;
            }
            return `-left-5`;
        }
    }
    return <> 
        <div className="relative p-4 z-2 bg-indigo-500/50 rounded-full text-center">
            Spin Me!
            <span className={`bg-indigo-500/50 min-w-4 min-h-4 rounded-full absolute -bottom-5 ${placeTooltip(orientation, '1')}`}></span>
            <span className={`bg-indigo-500/50 min-w-4 min-h-4 rounded-full absolute -bottom-8 ${placeTooltip(orientation, '5')}`}></span>
        </div>
        </>
  };
  

export default Home