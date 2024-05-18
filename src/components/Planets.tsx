import React, {useRef, useState} from 'react';
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber';
import {Texture, TextureLoader} from "three";


const ORBIT_CONST = 1.4;
const TWO_PI = 2 * Math.PI;

interface StarProps {
    position?: [number, number, number],
    sphere_args?: [number, number, number],
    colorMap?: Texture
    orbitRadius?: number,
    rotSpeed?: number,
    emissiveMap?: Texture,
}

function Star(
    {position=[0, 0, 0], sphere_args=[2, 32, 32], colorMap, rotSpeed=0.1, emissiveMap}: StarProps
) {
    const meshRef: any = useRef();
    useFrame((_state, delta) => {
        meshRef.current.rotation.y += delta * rotSpeed;
    })
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={sphere_args}/>
            <meshStandardMaterial map={colorMap} emissive={'yellow'} emissiveMap={emissiveMap} emissiveIntensity={7}/>
            <pointLight
                color={'yellow'}
                intensity={5.0}
                distance={0}
                decay={0.5}
            />
        </mesh>
    );
}

interface PlanetProps {
    sphere_args?: [number, number, number],
    colorMap?: Texture
    orbitRadius?: number,
    rotSpeed?: number,
}

function Planet(
    {sphere_args=[0.5, 32, 32], colorMap, orbitRadius=5, rotSpeed=0.1}: PlanetProps
) {
    const meshRef: any = useRef();
    const orbitSpeed = ORBIT_CONST / orbitRadius;
    let [theta, setTheta] = useState(0);
    useFrame((_state, delta) => {
        // axis rotation
        meshRef.current.rotation.y -= delta * rotSpeed;
        // orbit
        let t = theta + orbitSpeed * delta;
        if (t > TWO_PI) t -= TWO_PI;
        setTheta(t);
        let new_x = orbitRadius * Math.cos(theta);
        let new_y = orbitRadius * Math.sin(theta);
        meshRef.current.position.set(new_x, 0, new_y);
    })
    return (
        <mesh ref={meshRef} position={[orbitRadius, 0, 0]}>
            <sphereGeometry args={sphere_args}/>
            <meshStandardMaterial map={colorMap}/>
        </mesh>
    );
}

export function Camera() {
    useThree(({camera}) => {
        camera.lookAt(0, 0, 0);
        camera.position.set(10, 6, 10);
    })
    return <></>
}

export function PlanetsCanvas() {
    const bricks = useLoader(TextureLoader, 'PavingStones092_1K-PNG_Color.png');
    const sun = useLoader(TextureLoader, 'planets/2k_sun.jpg');
    const mercury = useLoader(TextureLoader, 'planets/2k_mercury.jpg');
    const venus = useLoader(TextureLoader, 'planets/2k_venus_surface.jpg');
    const jupiter = useLoader(TextureLoader, 'planets/2k_jupiter.jpg');
    return (
        <div className="CanvasContainer">
            <Canvas>
                <Camera/>
                <Star colorMap={sun} sphere_args={[1, 32, 32]} emissiveMap={sun}/>
                <Planet colorMap={mercury} orbitRadius={6}  sphere_args={[0.3, 32, 32]}/>
                <Planet colorMap={venus} orbitRadius={13} sphere_args={[0.4, 32, 32]}/>
                <Planet colorMap={bricks} orbitRadius={19} sphere_args={[0.7, 32, 32]}/>
                <Planet colorMap={jupiter} orbitRadius={24} sphere_args={[0.6, 32, 32]}/>
                <ambientLight intensity={0.1}/>
                {/*<directionalLight color="red" position={[0, 5, 0]}/>*/}
            </Canvas>
        </div>
    );
}
