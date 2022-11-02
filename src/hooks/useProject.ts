import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProject, updateProject } from '../utils/api';
import { Project, UpdateProjectParams } from '../utils/types';
import { UseProject } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useProject: UseProject = ({ reset }) => {
  const params = useParams();
  const queryClient = useQueryClient();

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

  const updateProjectMutation = useMutation(
    (data: UpdateProjectParams) => updateProject(data),
    {
      onSuccess: (data: Project) => {
        queryClient.setQueryData(['projects', data.id.toString()], data);
        reset({
          code: data.code,
          description: data.description,
          language: data.language,
        });
      },
      ...useQueryWithRedirect(),
    }
  );

  return { isLoading, project, isError, updateProjectMutation };
};

export default useProject;
