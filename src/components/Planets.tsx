import React, {useRef} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import {Texture, TextureLoader} from "three";


interface PlanetProps {
    position: [number, number, number],
    sphere_args?: [number, number, number],
    colorMap?: Texture
}

function Planet({position, sphere_args, colorMap}: PlanetProps) {
    const meshRef: any = useRef();
    const rotSpeed = 0.1;
    useFrame((state, delta) => {
        // @ts-ignore
        meshRef.current.rotation.y += delta * rotSpeed;
    })
    if (!sphere_args) {
        sphere_args = [2, 32, 32]
    }
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={sphere_args}/>
            <meshStandardMaterial color={'yellow'} map={colorMap}/>
        </mesh>
    );
}

export function BackgroundCanvas() {
    const colorMap = useLoader(TextureLoader, 'PavingStones092_1K-PNG_Color.png');
    return (
        <div className="CanvasContainer">
            <Canvas>
                <Planet position={[0, 0, 0]} colorMap={colorMap}/>
                <ambientLight intensity={1.0}/>
                <directionalLight color="red" position={[0, 5, 0]}/>
            </Canvas>
        </div>
    );
}
