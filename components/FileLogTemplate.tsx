
import { useState, useEffect, useRef } from 'react';

// import code highlight stuff
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github.css';
import { IRunCollectedData } from '../src/state/stores/RunStore';

hljs.registerLanguage('typescript', typescript);

interface IProps {
  filePreview: string;
  debugPointerData: IRunCollectedData;
}

const FileLogTemplate: React.FC<IProps> = ({ filePreview, debugPointerData: collectedData }) => {
  
  const preRef = useRef(null);
  const [codeText, setCodeText] = useState(filePreview);
  
  useEffect(() => {

    const fileModifyedPreview = filePreview.replace(/\<\%=(.+?)\%\>/gm, (a, b) => {
      let id = b.trim();

      if(collectedData[id]){
        return `<div 
          style="background: #474343; color: #c9e9c9" data-id="${id}""
        >[${collectedData[id].variableName} = ${collectedData[id].val}]</div>`;
      }

      return '[not executed]'

    });

    // const highlightedCode = hljs.highlight(fileModifyedPreview, {language: 'typescript'}).value;

    // setCodeText(highlightedCode);

    setCodeText(fileModifyedPreview)

    const onClick = (e) => {
      
      if(e.target.getAttribute('data-ref-id')){
        
        alert('click');
        
        console.log(e.target);
      }
    };
    preRef.current.addEventListener('click', onClick);

    return () => {
      if(preRef.current){
        preRef.current.removeEventListener('click', onClick);
      }
    }

  }, [filePreview])


  return (
    <pre ref={preRef} style={{padding: '10px', border: '1px solid silver'}} dangerouslySetInnerHTML={{__html: codeText}}>

    </pre>  
  );
}

export default FileLogTemplate;