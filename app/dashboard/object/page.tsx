'use client'

import { useSearchParams } from 'next/navigation'
import SceneClient from '@/app/components/SceneClient'

export default function ObjectsPage() {
    const searchParams = useSearchParams()
    const url = searchParams.get('url')

    if (!url) {
        return <p>No model URL provided.</p>
    }

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }}>
            <SceneClient modelUrl={url} />
        </div>
    )
}
