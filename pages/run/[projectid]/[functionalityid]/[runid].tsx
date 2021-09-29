
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react'
import { useApiClient } from '../../../../src/hooks/useApiClient';
import useLoadProject from '../../../../src/hooks/useLoadProject';
import FunctionalityArtefact from '../../../../src/state/artefacts/FunctionalityArtefact';
import { useStore } from '../../../../src/state/stores/RootStore';

interface IProps {

}

const Run: FC<IProps> = ({  }) => {

    const router = useRouter();
    const { artefactStore } = useStore();
    const { loading } = useLoadProject(router.query.projectid as string);
    const { getClient } = useApiClient();
  
    useEffect(() => {

        if(router.query.runid){
            startRun();
        }
    }, []);

    if(loading === true){
      return null;
    }

    async function startRun(){
        const client = await getClient();
        await client.startRun(router.query.runid as string);
    }

    let artefact = artefactStore.getArtefact(router.query.functionalityid as string) as FunctionalityArtefact;
    let run = artefact.getRun( router.query.runid as string);

    return (
        <div>
            {JSON.stringify(run)}
        </div>
    );
}

export default Run;