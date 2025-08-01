import React from 'react';
import Frame, { FrameContext } from 'react-frame-component';

interface PreviewFrameProps {
  children: React.ReactNode;
}

const IframeThemeInjector: React.FC = () => {
    const { document: iframeDocument } = React.useContext(FrameContext);

    React.useEffect(() => {
        if (!iframeDocument) return;

        const syncDarkMode = () => {
            const parentHtml = window.parent.document.documentElement;
            if (parentHtml.classList.contains('dark')) {
                iframeDocument.documentElement.classList.add('dark');
            } else {
                iframeDocument.documentElement.classList.remove('dark');
            }
        };

        syncDarkMode();

        const observer = new MutationObserver(syncDarkMode);
        observer.observe(window.parent.document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, [iframeDocument]);

    return null;
};


const PreviewFrame: React.FC<PreviewFrameProps> = ({ children }) => {
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
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background-color: transparent;
        }
      `}</style>
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
        <IframeThemeInjector />
        {children}
    </Frame>
  );
};

export default PreviewFrame;