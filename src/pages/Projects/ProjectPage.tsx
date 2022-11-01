import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  Job,
  JobStatus,
  Project,
  UpdateProjectParams,
} from '../../utils/types';
import { ProjectInfo } from '../../utils/types/props';
import ProjectPageLayout from '../../components/Project/ProjectPageLayout';
import EditDescription from '../../components/Project/EditDescription';
import ActionSection from '../../components/Project/ActionSection';
import useProject from '../../hooks/useProject';
import { useForm } from 'react-hook-form';
import SaveProject from '../../components/Project/SaveProject';
import { AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  updateProject,
  createJob as createJobApi,
  getAllJobs,
} from '../../utils/api';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import JobSection from '../../components/Project/JobSection';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import ProjectHeader from '../../components/Project/ProjectHeader';
import ProjectModal from '../../components/Modals/ProjectModal';
import { convertJob } from '../../utils/helpers';

const ProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const [showOverlay, setShowOverlay] = useState(false);

  // Form validation
  const { register, formState, reset, getValues, handleSubmit, setValue } =
    useForm<ProjectInfo>({
      reValidateMode: 'onBlur',
    });

  // Extracting state from form hook
  const { code, language, description } = getValues();
  const { errors, isDirty } = formState;

  // Fetching project
  const { isLoading, project } = useProject({ reset });

  // // Fetching jobs related to the project
  // const { isLoading: isJobLoading, data: lastJobRan } = useQuery(
  //   ['job', project?.id.toString()],
  //   () => getLatestJob(project!.id.toString()),
  //   useQueryWithRedirect({
  //     enabled: !!project?.id,
  //     cacheTime: 0,
  //     onSuccess: (data?: Job) => {
  //       if (!data) {
  //         return queryClient.setQueryData(
  //           ['job', project?.id.toString()],
  //           null
  //         );
  //       }
  //       const { compiledAt, startedAt } = data;
  //       const updated = {
  //         ...data,
  //         submittedAt: new Date(data.submittedAt),
  //       };
  //       if (compiledAt) updated.compiledAt = new Date(compiledAt);
  //       if (startedAt) updated.startedAt = new Date(startedAt);

  //       queryClient.setQueryData(['job', project?.id.toString()], updated);
  //     },
  //   })
  // );
  const { isLoading: isJobLoading, data: jobs } = useQuery(
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
          const { compiledAt, startedAt } = job;
          const updated = {
            ...job,
            submittedAt: new Date(job.submittedAt),
          };
          if (compiledAt) updated.compiledAt = new Date(compiledAt);
          if (startedAt) updated.startedAt = new Date(startedAt);
          return updated;
        });

        queryClient.setQueryData(['jobs', project?.id.toString()], converted);
      },
    })
  );

  // Update project mutation
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

  // Create Job Mutation
  const createJobMutation = useMutation((id: string) => createJobApi(id), {
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

  // Save project
  const saveProject = (data: ProjectInfo) => {
    // If form fields are actually changed
    if (!isDirty) return;
    updateProjectMutation.mutateAsync({ id: project!.id.toString(), ...data });
  };

  // Listening for onJobDone event
  useEffect(() => {
    if (!project) return;

    socket.on('onJobDone', (job: Job) => {
      const converted = convertJob(job);
      const currentJobs = (
        queryClient.getQueryData(['jobs', project.id.toString()]) as Job[]
      ).filter((j) => j.id !== converted.id);
      currentJobs.unshift(converted);

      console.log(job);
      console.log(currentJobs);

      queryClient.setQueryData(['jobs', project.id.toString()], currentJobs);
    });

    return () => {
      socket.off('onJobDone');
    };
  }, [socket, project, queryClient]);

  // Create job
  const createJob = () => {
    if (!project) return;
    createJobMutation.mutateAsync(project.id.toString());
  };

  // isLoading: wether project is loading
  // project: The project
  // isJobLoading: wether last job is loading
  if (isLoading || !project || isJobLoading)
    return <Loader active size='big' />;

  return (
    <>
      <AnimatePresence>
        {isDirty && <SaveProject handleSubmit={handleSubmit(saveProject)} />}
      </AnimatePresence>

      <ProjectPageLayout
        saveProject={handleSubmit(saveProject)}
        code={code}
        language={language}
        setValue={setValue}
        isDirty={isDirty}
      >
        <GiHamburgerMenu
          className='w-7 h-7 fixed lg:hidden right-24 top-10'
          style={{ zIndex: 9999 }}
          onClick={() => setShowOverlay((prev) => !prev)}
        />

        <AnimatePresence key={project.id}>
          {showOverlay && (
            <ProjectModal
              jobs={jobs ?? []}
              createJob={createJob}
              disabled={
                createJobMutation.isLoading ||
                (jobs
                  ? jobs.some((j) => j.status === JobStatus.PENDING)
                  : false)
              }
            />
          )}
        </AnimatePresence>

        <div className='h-full hidden lg:w-[45%] lg:flex p-10 flex-col border-l-[.2px] border-[#1E1E1E] shrink gap-12'>
          <RiLogoutCircleFill
            className='w-10 h-10  cursor-pointer'
            onClick={() => navigate('/home')}
          />

          <div className='flex flex-col items-center justify-between h-full'>
            <ProjectHeader
              formFieldProps={{ register, errors }}
              project={project}
            />

            <JobSection
              jobs={jobs?.length ? [jobs[0]] : []}
              showSeeAll={true}
            />

            <div className='flex flex-col items-center justify-center gap-4 w-full'>
              <EditDescription setValue={setValue} description={description} />
              <ActionSection
                createJob={createJob}
                disabled={
                  createJobMutation.isLoading ||
                  (jobs
                    ? jobs.some((j) => j.status === JobStatus.PENDING)
                    : false)
                }
              />
            </div>
          </div>
        </div>
      </ProjectPageLayout>
    </>
  );
};

export default ProjectPage;
