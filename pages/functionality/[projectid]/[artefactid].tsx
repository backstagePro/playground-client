import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import MonacoEditor from "../../../components/MonacoEditor";
import useLoadProject from "../../../src/hooks/useLoadProject";
import { IServiceArtefact } from "../../../src/state/artefacts/IServiceArtefact";

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
    <div>
      {artefact?.name}
      <MonacoEditor />
    </div>  
  )
})

export default ArtefactFunctionality;