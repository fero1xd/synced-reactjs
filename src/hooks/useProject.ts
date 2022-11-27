import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, updateProject } from '../utils/api';
import { SocketContext } from '../utils/context/SocketContext';
import { Project, UpdateProjectParams } from '../utils/types';
import { UseProject } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useProject: UseProject = ({ reset }) => {
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

  const updateProjectMutation = useMutation(
    (data: UpdateProjectParams) => updateProject(data),
    useQueryWithRedirect()
  );

  useEffect(() => {
    if (project && project.isPublic) {
      const projectId = project.id;
      socket.emit('onProjectJoin', { projectId });

      socket.on('onProjectUpdate', (project: Project) => {
        queryClient.setQueryData(['projects', project.id.toString()], project);
        reset({
          code: project.code,
          description: project.description,
          language: project.language,
        });
      });
    }
    return () => {
      if (project) {
        socket.emit('onProjectLeave', { projectId: project.id });
      }
      socket.off('onProjectUpdate');
    };
  }, [socket, project]);

  return { isLoading, project, isError, updateProjectMutation };
};

export default useProject;
