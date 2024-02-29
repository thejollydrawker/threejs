import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import earth from "../../assets/3d/stylized_planet.glb";
import { act, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

const Earth = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(earth);
    const { actions } = useAnimations(animations, group);
    const {gl, viewport} = useThree();
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.85;

    const handlePointerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;

        lastX.current = clientX;
    }

    const handlePointerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);
    }

    const handlePointerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const delta = (clientX - lastX.current) / viewport.width;
  
          group.current.rotation.y += delta * 0.01 * Math.PI;
          lastX.current = clientX;
          rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    }

    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            } 
            group.current.rotation.y += rotationSpeed.current;
        } else {
            const rotation = group.current.rotation.y;

            //ensure te rotation value remains in a specific range to prevent positional issues or negative rotational values
            const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            const segmentSize = 2 * Math.PI / 3;
            const segmentIndex = parseInt(normalizedRotation / segmentSize)
            setCurrentStage(segmentIndex+1);
        }
    })

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
        }

    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group rotation={[-1.54, -0.064, 0]}>
          <group>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials.Clouds}
                />
              </group>
              <group name="Planet_2">
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6.geometry}
                  material={materials.Planet}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(earth);

export default Earth;