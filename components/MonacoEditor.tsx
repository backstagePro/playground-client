import { useEffect, useRef } from "react";
import loader from '@monaco-editor/loader';
import { editor } from "monaco-editor";

interface IProps {

}

const MonacoEditor: React.FC<IProps> = ({}) => {

  let editorRef = useRef<any>(null);

  let editor: editor.IStandaloneCodeEditor;

  useEffect(() => {
    loader.init().then(monaco => {
      editor = monaco.editor.create(editorRef.current, {
        value: '// some comment',
        language: 'typescript',
      });
    });

    return () => {
      editor.dispose();
      editorRef.current.innerHTML = ''
    }
  }, []);

  return (
    <div style={{minHeight: '300px'}} ref={editorRef}></div> 
  )
}

export default MonacoEditor;