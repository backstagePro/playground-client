import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import useLoadProject from "../../../src/hooks/useLoadProject";
import { Typography, Card, Button } from 'antd';
import Link from 'next/link';
import { useStore } from "../../../src/state/stores/RootStore";
import FunctionalityArtefact from "../../../src/state/artefacts/FunctionalityArtefact";

const { Title } = Typography;

interface IProps {

}

const ArtefactFunctionality: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  const { loading } = useLoadProject(router.query.projectid as string);
  const { artefactStore } = useStore();

  if(loading === true){
    return null;
  }

  let artefact = artefactStore.getArtefact(router.query.artefactid as string) as FunctionalityArtefact;

  let runs: any = [];
  artefact.forEachRun((run) => {
    runs.push(
        <div>
            Run: {run.name} 
            <Link href={`/run/${router.query.projectid}/${router.query.artefactid}/${run.id}`}>
                <Button>START</Button>
            </Link>
        </div>
    )
  });

  return (
    <Card>
      <Title level={5}>{artefact.getName()}</Title>
      {runs}
    </Card>  
  )
})

export default ArtefactFunctionality;