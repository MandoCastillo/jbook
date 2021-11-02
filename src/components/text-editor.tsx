import '../assets/css/text-editor.css'
import MDEditor from '@uiw/react-md-editor';
import { FC, useEffect, useRef, useState } from 'react';

const TextEditor: FC = () => {
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const [editing, setEditing] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if(ref.current && event.target && ref.current?.contains(event.target as Node) ) {
        return
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
        value={value}
        onChange={(val) => {
          setValue(val || '');
        }}
      />
    </div>;
  }

  return <div className="text-editor card" onClick={() => setEditing(true)}>
    <div className="card-content">
      <MDEditor.Markdown source={value} />
    </div>
  </div>;
};

export default TextEditor;
