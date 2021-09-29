import { useRouter } from "next/router";
import { observer } from 'mobx-react-lite';
import { Typography, Row, Button, Col, Card } from 'antd';
import Link from 'next/link';
import useLoadProject from "../../../src/hooks/useLoadProject";
import { IServiceArtefact } from "../../../src/state/artefacts/IServiceArtefact";
import ArtefactButton from "../../../components/ArtefactButton";


const { Title } = Typography;

interface IProps {

}

const FunctionalityArtefacts: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  const projectId = router.query.projectid as string;

  const { projectStore, loading } = useLoadProject(projectId);

  if(loading === true){
    return null;
  }

  let artefactsJsx: any[] = [];

  if(projectStore.currentOpenProject){

    let groups = projectStore.getArtefactGroups()['functionality'];

    (groups.artefacts as IServiceArtefact[]).forEach(( artefact ) => {
      artefactsJsx.push(
        <ArtefactButton artefact={artefact} onClick={() => {router.push(`/functionality/${projectId}/${artefact.id}`)}}>
            {artefact.servicePath}
        </ArtefactButton>
      )
    });
  }


  return (
    <Card>
      <Title level={3}> Functionality for project <span style={{color: '#1890ff'}}>{projectStore.getProjectNameFromPath}</span></Title>
      <div>{artefactsJsx}</div>
    </Card>
  )
})

export default FunctionalityArtefacts;