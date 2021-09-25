import { useEffect } from "react";
import MonacoEditor from "../../components/MonacoEditor";
import ServiceLocator from "../../src/ServiceLocator";
import { SERVICE_HTTP_CLIENT } from "../../src/services";

interface IProps {

}

const Index: React.FC<IProps> = ({}) => {


  return (
    <div> 
      <MonacoEditor />  
    </div>
  )
}

export default Index;