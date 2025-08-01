import React from 'react';
import Frame from 'react-frame-component';

interface PreviewFrameProps {
    children: React.ReactNode;
}

/**
 * This component creates an iframe and injects all of the parent document's
 * stylesheets into it. This allows Tailwind's responsive classes to work
 * based on the iframe's dimensions, not the browser's viewport.
 */
const PreviewFrame: React.FC<PreviewFrameProps> = ({ children }) => {
    // This creates React elements (<link> and <style>) from the main document's head
    // to be injected into the iframe's <head>.
    const head = (
        <>
            {Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map((node, index) => {
                if (node.tagName === 'LINK') {
                    const href = (node as HTMLLinkElement).href;
                    return <link key={index} rel="stylesheet" href={href} />;
                }
                if (node.tagName === 'STYLE') {
                    return <style key={index}>{node.innerHTML}</style>;
                }
                return null;
            })}
        </>
    );

    return (
        <Frame
            head={head}
            initialContent='<!DOCTYPE html><html><head></head><body><div id="frame-root"></div></body></html>'
            mountTarget='#frame-root'
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
            }}
        >
            {children}
        </Frame>
    );
};

export default PreviewFrame;