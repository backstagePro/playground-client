import { useRouter } from 'next/router'
import { Card } from 'antd';
import { useEffect } from 'react';
import { useStore } from '../../../src/state/stores/RootStore';
import { observer } from 'mobx-react-lite'

interface IProps {

}

const ProjectPage: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  const { projectStore } = useStore()
  let projectId = router.query.id as string;

  useEffect(() => {

    if(projectId !== void(0)){
      projectStore.fetchProject(projectId)
    }

  }, [projectId]);

  if(projectId === void(0)){
    return null;
  }

  return (
    <Card>
      {JSON.stringify(projectStore.currentOpenProject)}
    </Card>  
  )
});

export default ProjectPage;