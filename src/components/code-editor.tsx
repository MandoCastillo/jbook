import '../assets/css/code-editor.css';
import '../assets/css/syntax.css';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { FC, useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import traverse from '@babel/traverse';
import Highlighter from 'monaco-jsx-highlighter';
import parse from '@babel/parser';

interface CodeEditorProps {
  initialValue: string;

  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({tabSize: 2});
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      parse,
      traverse,
      editor
    );

    highlighter.highLightOnDidChangeModelContent(100);
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getValue();
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onEditorDidMount}
        value={initialValue}
        height={600}
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: {enabled: false},
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
