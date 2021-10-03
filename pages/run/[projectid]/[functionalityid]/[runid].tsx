
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react'
import useLoadProject from '../../../../src/hooks/useLoadProject';
import { useStore } from '../../../../src/state/stores/RootStore';

interface IProps {

}

const Run: FC<IProps> = observer(({  }) => {

    const router = useRouter();
    const { runStore } = useStore();
    const { loading } = useLoadProject(router.query.projectid as string);
  
    useEffect(() => {

        if(router.query.runid){
            runStore.startRunSesstion(router.query.runid as string).catch((e) => {
                alert('error' + e);
            });
        }
    }, [router.query.runid]);

    if(loading === true){
      return null;
    }

    // let artefact = artefactStore.getArtefact(router.query.functionalityid as string);
    // let run = runStore.findRun( router.query.runid as string);

    return (
        <div>
            { runStore.currentRunFileData ?
             <pre> { JSON.stringify(runStore.currentRunFileData, undefined, 2) }</pre>: 
             <span> loading </span>}
        </div>
    );
});

export default Run;