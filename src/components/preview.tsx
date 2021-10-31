import '../assets/css/preview.css';
import { FC, useEffect, useRef } from 'react';
import { html } from '../helpers/consts';

interface PreviewProps {
  code: string;
}

const Preview: FC<PreviewProps> = ({code}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
