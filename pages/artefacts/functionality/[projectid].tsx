import { useRouter } from "next/router";
import { observer } from 'mobx-react-lite';
import { Typography, Row, Button, Col, Card } from 'antd';
import Link from 'next/link';
import useLoadProject from "../../../src/hooks/useLoadProject";
import { IServiceArtefact } from "../../../src/state/artefacts/IServiceArtefact";


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
    (projectStore.currentOpenProject.artefacts['functionality'] as IServiceArtefact[]).forEach(( artefact ) => {
      artefactsJsx.push(
        <Row style={{borderBottom: '1px dashed silver', padding: '10px 0'}} justify="space-around" align="middle">
          <Col span="20">
            <div>
              <Title level={5}>{artefact.name}</Title>
            </div>
            <div>
              {artefact.servicePath}
            </div>
          </Col>
          <Col span="4">
            <Link href={`/functionality/${projectId}/${artefact.id}`}><Button type="primary">Open</Button></Link>
          </Col>
        </Row>
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