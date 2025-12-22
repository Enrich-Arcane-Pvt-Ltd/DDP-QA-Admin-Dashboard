'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Bounds } from '@react-three/drei'
import Model from './Model'
import { useRef, useEffect, useState } from 'react'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export default function SceneClient({ modelUrl }: { modelUrl: string }) {
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const [autoRotate, setAutoRotate] = useState(false)

    useEffect(() => {
        if (!controlsRef.current) return

        controlsRef.current.setPolarAngle(Math.PI / 2)
        controlsRef.current.setAzimuthalAngle(0)
        controlsRef.current.update()
    }, [])

    const handleZoomIn = () => {
        if (!controlsRef.current) return
        const camera = controlsRef.current.object
        camera.zoom = Math.min(camera.zoom * 1.2, 10)
        camera.updateProjectionMatrix()
    }

    const handleZoomOut = () => {
        if (!controlsRef.current) return
        const camera = controlsRef.current.object
        camera.zoom = Math.max(camera.zoom / 1.2, 0.1)
        camera.updateProjectionMatrix()
    }

    const toggleAutoRotate = () => {
        setAutoRotate(!autoRotate)
    }

    return (
        <div className="relative w-full h-full">
            <Canvas camera={{ fov: 50 }}>
                <ambientLight intensity={0} />
                <directionalLight position={[5, 5, 5]} intensity={0} />

                <Bounds fit observe margin={1.2}>
                    <Model url={modelUrl} />
                </Bounds>

                <OrbitControls
                    ref={controlsRef}
                    makeDefault
                    enableDamping
                    autoRotate={autoRotate}
                    autoRotateSpeed={2}
                />

                <Environment preset="sunset" />
            </Canvas>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary-800/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-primary-700/50 shadow-2xl">
                <button
                    onClick={handleZoomIn}
                    className="p-2.5 rounded-xl bg-primary-700/50 hover:bg-accent-600/30 text-light-700 hover:text-accent-400 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Zoom In"
                >
                    <ZoomIn className="w-5 h-5" />
                </button>

                <div className="w-px h-8 bg-primary-600/50" />

                <button
                    onClick={handleZoomOut}
                    className="p-2.5 rounded-xl bg-primary-700/50 hover:bg-accent-600/30 text-light-700 hover:text-accent-400 transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-5 h-5" />
                </button>

                <div className="w-px h-8 bg-primary-600/50" />

                <button
                    onClick={toggleAutoRotate}
                    className={`p-2.5 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
                        autoRotate 
                            ? 'bg-accent-600/50 text-accent-300' 
                            : 'bg-primary-700/50 hover:bg-accent-600/30 text-light-700 hover:text-accent-400'
                    }`}
                    title="Auto Rotate"
                >
                    <RotateCcw className="w-5 h-5" />
                </button>
            </div>

            <div className="absolute top-6 left-6 bg-primary-800/80 backdrop-blur-md px-4 py-2 rounded-xl border border-primary-700/50 shadow-lg">
                <p className="text-xs text-light-600 font-medium">
                    Drag to rotate • Scroll to zoom 
                </p>
            </div>
        </div>
    )
}