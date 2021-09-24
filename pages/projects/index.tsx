import { useEffect } from "react";
import ServiceLocator from "../../src/ServiceLocator";
import { SERVICE_HTTP_CLIENT } from "../../src/services";

interface IProps {

}

const Index: React.FC<IProps> = ({}) => {

  // useEffect(() => {

  //   async function call(){
  //     let client = await ServiceLocator.get<SERVICE_HTTP_CLIENT>(SERVICE_HTTP_CLIENT);

  //     let data;
  //     try{
        
  //       data = await client.getClient().get('projects')    
  //     } catch(e){

  //       console.log(e);
  //     }

  //     console.log('data', data);
  //   }

  //   call()
  // }, []);

  return (
    <div> Projects </div>
  )
}

export default Index;