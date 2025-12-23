import { Suspense } from 'react'
import ObjectPageClient from './ObjectPageClient'

export default function ObjectsPage() {
    return (
        <Suspense>
            <ObjectPageClient />
        </Suspense>
    )
}