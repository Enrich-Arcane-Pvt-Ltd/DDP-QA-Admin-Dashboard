'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Model from './Model'

export default function Scene() {
    return (
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={1} />

            <Model />

            <OrbitControls />
            <Environment preset="studio" />
        </Canvas>
    )
}
