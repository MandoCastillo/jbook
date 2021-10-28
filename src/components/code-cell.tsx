import { useRef, useState } from 'react';
import { codeExample, html } from '../helpers/consts';
import CodeEditor from './code-editor';
import { codeResult } from '../bundler';


const CodeCell = () => {
  const iframe = useRef<any>();
  const [input, setInput] = useState<string>(codeExample);
  const [isLoading, setIsLoading] = useState(false);
  // const [code, setCode] = useState<string>('');

  const onClick = async () => {
    setIsLoading(true)
    iframe.current.srcdoc = html;
    const result = await codeResult(input)
    // setCode(result)
    iframe.current.contentWindow.postMessage(result, '*');
    setIsLoading(false)
  };

  return <div>
    <CodeEditor
      initialValue={codeExample}
      onChange={(value) => setInput(value)}
    />
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    {isLoading && <p>Compilando</p>}
    <iframe
      ref={iframe}
      title="code preview"
      sandbox="allow-scripts"
      srcDoc={html}
      frameBorder="1"
    />
    {/*<Preview code={code}/>*/}
  </div>;
};

export default CodeCell
