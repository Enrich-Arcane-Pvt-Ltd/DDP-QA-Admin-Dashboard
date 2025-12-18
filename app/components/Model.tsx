'use client'

import { useGLTF, Center } from '@react-three/drei'

export default function Model() {
    const { scene } = useGLTF('/models/model.gltf')

    return (
        <Center top={false}> 
            <primitive object={scene} scale={1} />
        </Center>
    )
}

useGLTF.preload('/models/model.gltf')
