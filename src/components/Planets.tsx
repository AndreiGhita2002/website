import React from 'react';
import { Canvas } from '@react-three/fiber';


interface PlanetProps {
    position: [number, number, number],
    sphere_args?: [number, number, number],
}

function Planet({position, sphere_args}: PlanetProps) {
    if (!sphere_args) {
        sphere_args = [1, 16, 16]
    }
    return (
        <mesh position={position}>
            <sphereGeometry args={sphere_args}/>
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
}

export function BackgroundCanvas() {
    return (
        <div className="CanvasContainer">
            <Canvas>
                <Planet position={[0, 0, 0]}/>
                <ambientLight intensity={0.1}/>
                <directionalLight color="red" position={[0, 0, 5]}/>
            </Canvas>
        </div>
    );
}
