import { IArtefact } from "../src/state/stores/ProjectStore";
import { useStore } from "../src/state/stores/RootStore";
import styled from 'styled-components';

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
const colorMap: any = {
  'functionality': '#33ab3d'
}

interface IProps {

}

const ArtefactList: React.FC<IProps> = ({}) => {

  const { projectStore } = useStore();

  const renderArtefactBtn = ( groupName: string, count: number ) => {

    return (
      <ArtefactButton bgColor={colorMap[groupName]}>
        {groupName}
        {` [${count}]`}
      </ArtefactButton>
    )
  }

  const renderArtefacts = () => {
    let jsx: any = [];

    if(projectStore.currentOpenProject){

      let artefacts = projectStore.currentOpenProject.artefacts;

      Object.keys( artefacts ).forEach((groupName) => {
        jsx.push( renderArtefactBtn(groupName, artefacts[groupName].length) )
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