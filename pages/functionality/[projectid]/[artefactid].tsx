import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import MonacoEditor from "../../../components/MonacoEditor";
import useLoadProject from "../../../src/hooks/useLoadProject";
import { IServiceArtefact } from "../../../src/state/artefacts/IServiceArtefact";
import { Typography, Card, Button } from 'antd';
import Link from 'next/link';

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

  /**
   * Render runs
   */
  let runs: any = [];
  artefact?.runs.forEach((run) => {
    runs.push(
        <div>
            Run: {run.name} 
            <Link href={`/run/${router.query.projectid}/${router.query.artefactid}/${run.id}`}>
                <Button>START</Button>
            </Link>
        </div>
    )
  })

  return (
    <Card>
      <Title level={5}>{artefact?.name}</Title>
      {runs}
    </Card>  
  )
})

export default ArtefactFunctionality;