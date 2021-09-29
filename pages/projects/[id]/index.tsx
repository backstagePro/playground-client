import { useRouter } from 'next/router'
import { Card, Divider, Typography } from 'antd';
import { observer } from 'mobx-react-lite'
import ArtefactList from '../../../components/ArtefactsList';
import useLoadProject from '../../../src/hooks/useLoadProject';

const { Title } = Typography;

interface IProps {

}

const ProjectPage: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  let projectId = router.query.id as string;
  const { projectStore, loading } = useLoadProject(projectId);

  if(loading === true){
    return null;
  }

  return (
    <>
      <Card>
        <Title level={3}>{projectStore.getProjectNameFromPath}</Title>
      </Card>
      <Card>
        <ArtefactList projectId={projectId}></ArtefactList>
      </Card>
    </>
  )
});

export default ProjectPage;