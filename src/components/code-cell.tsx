import '../assets/css/preview.css'
import { useRef, useState } from 'react';
import { codeExample, html } from '../helpers/consts';
import CodeEditor from './code-editor';
import { codeResult } from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  const iframe = useRef<any>();
  const [input, setInput] = useState<string>(codeExample);
  // const [isLoading, setIsLoading] = useState(false);
  // const [code, setCode] = useState<string>('');

  const onClick = async () => {
    // setIsLoading(true);
    iframe.current.srcdoc = html;
    const result = await codeResult(input);
    // setCode(result)
    iframe.current.contentWindow.postMessage(result, '*');
    // setIsLoading(false);
  };

  return (
    <Resizable direction="vertical">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={codeExample}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <div className="preview-wrapper">
          <iframe
            ref={iframe}
            title="code preview"
            sandbox="allow-scripts"
            srcDoc={html}
            frameBorder="1"
          />
        </div>
      </div>
    </Resizable>);
};

export default CodeCell;
