import { useRouter } from "next/router";
import { useStore } from "../../../src/state/stores/RootStore";
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";

interface IProps {

}

const FunctionalityArtefacts: React.FC<IProps> = observer(({}) => {

  const router = useRouter();
  const projectId = router.query.projectid as string;

  const { projectStore } = useStore();
  const [ artefacts, setArtefacts ] = useState<any>({});

  useEffect(() => {
    
    projectStore.fetchProject(projectId).then((data) => {
      setArtefacts(projectStore.currentOpenProject?.artefacts);
    });
      
  }, []);

  let artefactsJsx: any[] = [];

  Object.keys(artefacts).forEach((groupName) => {
    artefactsJsx.push(
      <div>{groupName}</div>
    )
  })

  return (
    <div>{artefactsJsx}</div>
  )
})

export default FunctionalityArtefacts;