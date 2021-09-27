import { useRouter } from 'next/router'
import { Card, Divider, Typography } from 'antd';
import { useEffect } from 'react';
import { useStore } from '../../../src/state/stores/RootStore';
import { observer } from 'mobx-react-lite'
import ArtefactList from '../../../components/ArtefactsList';

const { Title } = Typography;

interface IProps {

}

const ProjectPage: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  let projectId = router.query.id as string;

  const { projectStore } = useStore()

  useEffect(() => {

    if(projectId !== void(0)){
      projectStore.fetchProject(projectId)
    }

  }, [projectId]);

  if(projectId === void(0)){
    return null;
  }

  return (
    <>
      <Card>
        <Title level={3}>{projectStore.getProjectNameFromPath}</Title>
      </Card>
      <Card>
        <ArtefactList></ArtefactList>
      </Card>
    </>
  )
});

export default ProjectPage;