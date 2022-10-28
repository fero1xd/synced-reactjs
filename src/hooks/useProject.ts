import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProject } from '../utils/api';
import { Project } from '../utils/types';
import { UseProject } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useProject: UseProject = ({ reset }) => {
  const params = useParams();

  const {
    isLoading,
    data: project,
    isError,
  } = useQuery(
    ['projects', params.id],
    () => getProject(params.id!),
    useQueryWithRedirect({
      cacheTime: 0,
      onSuccess: (data: Project) => {
        reset({
          code: data.code,
          description: data.description,
          language: data.language,
        });
      },
    })
  );

  return { isLoading, project, isError };
};

export default useProject;
