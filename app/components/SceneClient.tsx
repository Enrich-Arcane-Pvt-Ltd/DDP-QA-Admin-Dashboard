'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Bounds } from '@react-three/drei'
import Model from './Model'
import { useRef, useEffect } from 'react'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export default function SceneClient() {
    const controlsRef = useRef<OrbitControlsImpl>(null)

    useEffect(() => {
        if (!controlsRef.current) return

        controlsRef.current.setPolarAngle(Math.PI / 2)
        controlsRef.current.setAzimuthalAngle(0)
        controlsRef.current.update()
    }, [])

    return (
        <Canvas camera={{ fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />

            <Bounds fit observe margin={1.2}>
                <Model />
            </Bounds>

            <OrbitControls
                ref={controlsRef}
                makeDefault
                enableDamping
            />

            <Environment preset="studio" />
        </Canvas>
    )
}
