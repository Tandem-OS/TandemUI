// pages/TestPreview.tsx
import PreviewRenderer from "../components/registry/PreviewRenderer"

const TestPreview = () => {
    return (
        <div>
            {/* Default preview */}
            <PreviewRenderer id="minimal-hero-demo" />

            {/* Override previewProps with customProps */}
            <PreviewRenderer
                id="modern-hero-demo"
            />

            {/* Use defaultProps only */}
            <PreviewRenderer id="creative-hero-demo" />
        </div>
    )
}

export default TestPreview
