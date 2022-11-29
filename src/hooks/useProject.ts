import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, updateProject } from '../utils/api';
import { SocketContext } from '../utils/context/SocketContext';
import { mergeObject } from '../utils/helpers';
import { Project, UpdateProjectParams } from '../utils/types';
import { UseProject } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useProject: UseProject = ({ reset, code, description, language }) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);

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

  const updateProjectHelper = (data: Partial<Project>) => {
    const key = ['projects', data.id!.toString()];
    const project = queryClient.getQueryData(key) as Project;
    const merged = mergeObject(project, data);
    queryClient.setQueryData(key, merged);

    reset({
      code: data.code || code,
      language: data.language || language,
      description: data.description || description,
    });
  };

  const updateProjectMutation = useMutation(
    (data: UpdateProjectParams) => updateProject(data),
    {
      onSuccess: updateProjectHelper,
      ...useQueryWithRedirect(null, (err) => {
        const status = err.response?.status!;
        if (status === 401) {
          reset();
        }
      }),
    }
  );

  useEffect(() => {
    if (project && project.isPublic) {
      const projectId = project.id;
      socket.emit('onProjectJoin', { projectId });

      socket.on('onProjectUpdate', updateProjectHelper);
    }
    return () => {
      if (project) {
        socket.emit('onProjectLeave', { projectId: project.id });
      }
      socket.off('onProjectUpdate');
    };
  }, [socket, project]);

  return {
    isLoading,
    project,
    isError,
    updateProjectMutation,
  };
};

export default useProject;
