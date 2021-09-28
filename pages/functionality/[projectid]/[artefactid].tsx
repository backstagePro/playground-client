import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import MonacoEditor from "../../../components/MonacoEditor";
import useLoadProject from "../../../src/hooks/useLoadProject";
import { IServiceArtefact } from "../../../src/state/artefacts/IServiceArtefact";
import { Typography, Card } from 'antd';

const { Title } = Typography;

interface IProps {

}

const ArtefactFunctionality: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  const { projectStore, loading } = useLoadProject(router.query.projectid as string);

  if(loading === true){
    return null;
  }

  let artefact = projectStore.getArtefact<IServiceArtefact>(router.query.artefactid as string);

  return (
    <Card>
      <Title level={5}>{artefact?.name}</Title>
      <MonacoEditor />
    </Card>  
  )
})

export default ArtefactFunctionality;