import { useEffect, useState } from 'react';
import { codeExample } from '../helpers/consts';
import CodeEditor from './code-editor';
import { codeResult } from '../bundler';
import Resizable from './resizable';
import Preview from './preview';

const CodeCell = () => {
  const [input, setInput] = useState<string>(
    process.env.NODE_ENV === 'production' ? '' : codeExample
  );
  const [error, setError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await codeResult(input);
      setCode(result.code);
      setError(result.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={codeExample}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>);
};

export default CodeCell;
