'use client'

import { useGLTF, Center } from '@react-three/drei'

type Props = {
    url: string
}

export default function Model({ url }: Props) {    
    const { scene } = useGLTF(url)

    // const { scene } = useGLTF('/model.gltf')

    return (
        <Center top={false}> 
            <primitive object={scene} scale={1} />
        </Center>
    )
}

useGLTF.preload('/models/model.gltf')
