import { IRunCollectedData, IRunFileData, IRunPointData } from "../src/state/stores/RunStore";
import { toJS } from 'mobx';
import FileLogTemplate from "./FileLogTemplate";
import React, { useState } from "react";
import { Button } from "antd";

interface IProps {
  fileData: IRunFileData,
  collectedData: IRunCollectedData,
  fileExecList: string[]
}



/**
 * Used to show files with logged debug information inside of them
 * 
 * @param param
 * @returns 
 */
const SlideFileViewer: React.FC<IProps> = ({ fileData, collectedData, fileExecList }) => {

  const [currentFilePushCounter, setCurrentFilePushCounter] = useState(0); 
  const first = fileExecList[currentFilePushCounter];
  const [currentVisibleFiles, setCurrentVisibleLevel] = useState([first]);

  const renderFiles = function(fileData, currentVisible: string[], collectedData){

    let jsx = [];
    
    currentVisible.forEach((filePath: string) => {
      jsx.push(
        <div>
          <FileLogTemplate 
            filePreview={fileData[filePath].filePreview} 
            debugPointerData={collectedData} 
          />
          <Button onClick={() => {

            if(fileExecList[currentFilePushCounter + 1] !== void(0)){
              
              setCurrentVisibleLevel((currentState) => {
                return currentState.concat(fileExecList[currentFilePushCounter + 1])
              });

              setCurrentFilePushCounter((currentState) => currentState + 1);
            }

          }}> Next file </Button>
        </div>
      )
    })
  
    return <div style={{display: 'flex'}}>
      {jsx}
    </div>;
  }

  return (
    <div>{renderFiles(fileData, currentVisibleFiles, collectedData)}</div>  
  );
}

export default SlideFileViewer;