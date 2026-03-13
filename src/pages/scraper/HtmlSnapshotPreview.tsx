interface HtmlSnapshotPreviewProps {
    html: string;
    scale?: number;        // default 0.25 — scales down the 1440px layout to fit the card
    width?: number;        // iframe internal width, default 1440
    height?: number;       // iframe internal height, default 900
    className?: string;
}

const HtmlSnapshotPreview = ({
    html,
    scale = 0.25,
    width = 1440,
    height = 900,
    className = '',
}: HtmlSnapshotPreviewProps) => {
    return (
        <div
            className={`overflow-hidden rounded-lg ${className}`}
            style={{
                width: width * scale,
                height: height * scale,
            }}
        >
            <iframe
                srcDoc={html}
                scrolling="no"
                style={{
                    width,
                    height,
                    border: 'none',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default HtmlSnapshotPreview;