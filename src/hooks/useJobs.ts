import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllJobs, createJob } from '../utils/api';
import { convertJob } from '../utils/helpers';
import { Job, Project } from '../utils/types';
import { UseJobs } from '../utils/types/props';
import useQueryWithRedirect from './useQueryWithRedirect';

const useJobs: UseJobs = (project?: Project) => {
  const queryClient = useQueryClient();

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

  const createJobMutation = useMutation((id: string) => createJob(id), {
    onSuccess: (data: Job) => {
      const converted = convertJob(data);
      const currentJobs = (
        queryClient.getQueryData(['jobs', project?.id.toString()]) as Job[]
      ).filter((j) => j.id !== converted.id);
      currentJobs.unshift(converted);

      queryClient.setQueryData(['jobs', project?.id.toString()], currentJobs);
    },
    ...useQueryWithRedirect(),
  });

  return { areJobsLoading, isError, jobs, createJobMutation };
};

export default useJobs;
