import { FC, useEffect, useState } from 'react';
import { codeExample } from '../helpers/consts';
import CodeEditor from './code-editor';
import { codeResult } from '../bundler';
import Resizable from './resizable';
import Preview from './preview';
import { ICell } from '../state';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: ICell;
}

const CodeCell: FC<CodeCellProps> = ({cell}) => {
  const [error, setError] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const {updateCell} = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await codeResult(cell.content);
      setCode(result.code);
      setError(result.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>);
};

export default CodeCell;
