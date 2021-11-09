import '../assets/css/text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { FC, useEffect, useRef, useState } from 'react';
import { ICell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: ICell;
}

const TextEditor: FC<TextEditorProps> = ({cell}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const {updateCell} = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current?.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    };
  }, []);

  if (editing) {
    return <div ref={ref} className="text-editor">
      <MDEditor
        value={cell.content}
        onChange={(val) => {
          updateCell(cell.id, val || '');
        }}
      />
    </div>;
  }

  return <div className="text-editor card" onClick={() => setEditing(true)}>
    <div className="card-content">
      <MDEditor.Markdown source={cell.content || 'Click to edit'} />
    </div>
  </div>;
};

export default TextEditor;
