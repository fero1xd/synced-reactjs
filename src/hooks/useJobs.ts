import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { getAllJobs, createJob, clearJobs as clearJobsApi } from '../utils/api';
import { SocketContext } from '../utils/context/SocketContext';
import { convertJob } from '../utils/helpers';
import { Job, JobStatus, Project } from '../utils/types';
import { UseJobs } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useJobs: UseJobs = (
  setShowJobOutput: React.Dispatch<React.SetStateAction<Job | undefined>>,
  project?: Project,
  showJobOutput?: Job
) => {
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);

  // Getting all jobs
  const {
    isLoading: areJobsLoading,
    data: jobs,
    isError,
  } = useQuery(
    ['jobs', project?.id.toString()],
    () => getAllJobs(project!.id.toString()),
    useQueryWithRedirect({
      enabled: !!project?.id,
      cacheTime: 0,
      onSuccess: (data: Job[]) => {
        if (!data || !data.length) {
          return queryClient.setQueryData(['jobs', project?.id.toString()], []);
        }
        const converted = data.map((job) => {
          const updated = convertJob(job);
          return updated;
        });
        queryClient.setQueryData(['jobs', project?.id.toString()], converted);
      },
    })
  );

  const addJobHelper = (job: Job) => {
    const converted = convertJob(job);
    const currentJobs = (
      queryClient.getQueryData(['jobs', project?.id.toString()]) as Job[]
    ).filter((j) => j.id !== converted.id);
    currentJobs.unshift(converted);
    queryClient.setQueryData(['jobs', project?.id.toString()], currentJobs);
  };

  // Create job mutation
  const createJobMutation = useMutation((id: string) => createJob(id), {
    onSuccess: addJobHelper,
    ...useQueryWithRedirect(),
  });

  // Clear Jobs mutation
  const clearJobs = useMutation((id: string) => clearJobsApi(id), {
    onSuccess: () => {
      const key = ['jobs', project?.id.toString()];
      const filtered = (queryClient.getQueryData(key) as Job[]).filter(
        (j) => j.status === JobStatus.PENDING
      );
      queryClient.setQueryData(key, filtered);
    },
    ...useQueryWithRedirect(),
  });

  // Listening for onJobDone event
  useEffect(() => {
    if (!project) return;
    socket.on('onJobDone', (job: Job) => {
      const converted = convertJob(job);
      addJobHelper(job);

      if (showJobOutput && showJobOutput.id === converted.id) {
        setShowJobOutput(converted);
      } else if (!showJobOutput) {
        setShowJobOutput(converted);
      }
    });

    socket.on('onJobCreate', addJobHelper);
    return () => {
      socket.off('onJobDone');
      socket.off('onJobCreate');
    };
  }, [socket, project, queryClient, showJobOutput, setShowJobOutput]);

  return {
    areJobsLoading,
    isError,
    jobs,
    createJobMutation,
    clearJobs,
    isClearingJobs: clearJobs.isLoading,
  };
};

export default useJobs;
