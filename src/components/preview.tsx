import '../assets/css/preview.css';
import { FC, useEffect, useRef } from 'react';
import { html } from '../helpers/consts';

interface PreviewProps {
  code: string;
  error: string;
}

const Preview: FC<PreviewProps> = ({code, error}) => {
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
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
