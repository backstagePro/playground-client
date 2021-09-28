import { useEffect, useState } from "react";
import { useStore } from "../state/stores/RootStore";

/**
 * Loading the project in mobx model. 
 * 
 * @param projectId 
 * @returns 
 */
export default function useLoadProject( projectId: string ){

  const { projectStore } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(projectId !== void(0)){
      projectStore.fetchProject(projectId).then(() => {
        setLoading(false);
      })
    }

  }, [projectId]);

  return { projectStore, loading };
}