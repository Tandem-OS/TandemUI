// components/registry/PreviewRenderer.tsx
import React, { Suspense, useEffect, useState } from "react"
import { componentMap } from "./componentMap"

type PreviewRendererProps = {
    id: keyof typeof componentMap
    mode?: "preview" | "default"
    customProps?: Record<string, any>
}

const PreviewRenderer: React.FC<PreviewRendererProps> = ({ id, mode = "preview", customProps = {} }) => {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
    const [finalProps, setFinalProps] = useState<Record<string, any>>({})

    useEffect(() => {
        const load = async () => {
            const entry = componentMap[id]
            if (!entry) return

            const mod = await entry.builder()
            setComponent(() => mod.default)

            const mergedProps = {
                ...(entry.defaultProps || {}),
                ...(mode === "preview" ? entry.previewProps : {}),
                ...(customProps || {}),
            }

            setFinalProps(mergedProps)
        }

        load()
    }, [id, mode, customProps])

    if (!Component) return

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading component...</p>
            </div>
        }>
            <Component {...finalProps} />
        </Suspense>
    )
}

export default PreviewRenderer
