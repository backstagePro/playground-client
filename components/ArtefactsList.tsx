
import { useStore } from "../src/state/stores/RootStore";
import styled from 'styled-components';
import { getArtefactColor } from "../theme/artefact.colors";
import Link from 'next/link';

const ArtefactButton = styled.div<{bgColor: string}>`
  background-color:${props => props.bgColor || "white"};;
  padding: 20px;
  color: white;
  cursor: pointer;
  font-size: 20px;
`

const ArtefactWrapper = styled.div`
  display: flex;
`

interface IProps {

  projectId: string;
}

const ArtefactList: React.FC<IProps> = ({ projectId }) => {

  const { projectStore, artefactStore } = useStore();

  const renderArtefactBtn = ( groupName: string, count: number ) => {

    return (
      <Link href={`/artefacts/${groupName}/${projectId}`}>
        <ArtefactButton bgColor={getArtefactColor(groupName)}>
          {groupName}
          {` [${count}]`}
        </ArtefactButton>
      </Link>
    )
  }

  const renderArtefacts = () => {
    let jsx: any = [];

    if(projectStore.currentOpenProject){

        let groups = artefactStore.getGroups();

        Object.keys( groups ).forEach((groupName) => {
            jsx.push( renderArtefactBtn(groupName, groups[groupName].count) )
        })
    }


    return jsx;
  }

  return (
    <div>
      <ArtefactWrapper>
        {renderArtefacts()}
      </ArtefactWrapper>
    </div>
  )
}

export default ArtefactList;