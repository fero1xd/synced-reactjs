import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import {
  AvailableLanguages,
  Job,
  JobStatus,
  Project,
  UpdateProjectParams,
} from '../../utils/types';
import Select from '../../components/Shared/Select';
import { ProjectInfo } from '../../utils/types/props';
import { toTitleCase } from '../../utils/helpers';
import ProjectPageLayout from '../../components/Project/ProjectPageLayout';
import EditDescription from '../../components/Project/EditDescription';
import ActionSection from '../../components/Project/ActionSection';
import useProject from '../../hooks/useProject';
import { useForm } from 'react-hook-form';
import SaveProject from '../../components/Project/SaveProject';
import { AnimatePresence } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getLatestJob,
  updateProject,
  createJob as createJobApi,
} from '../../utils/api';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import JobSection from '../../components/Project/JobSection';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';

const ProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);

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

  // Fetching latest job if any
  const { isLoading: isJobLoading, data: lastJobRan } = useQuery(
    ['job', project?.id],
    () => getLatestJob(project!.id.toString()),
    useQueryWithRedirect({
      enabled: !!project?.id,
      cacheTime: 0,
      onSuccess: (data?: Job) => {
        if (!data) {
          return queryClient.setQueryData(['job', project?.id], null);
        }
        const { compiledAt, startedAt } = data;
        const updated = {
          ...data,
          submittedAt: new Date(data.submittedAt),
        };
        if (compiledAt) updated.compiledAt = new Date(compiledAt);
        if (startedAt) updated.startedAt = new Date(startedAt);

        queryClient.setQueryData(['job', project?.id], updated);
      },
    })
  );

  // Update project mutation
  const updateMutation = useMutation(
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

  const createMutation = useMutation((id: string) => createJobApi(id), {
    onSuccess: (data: Job) => {
      const updated = {
        ...data,
        submittedAt: new Date(data.submittedAt),
      };

      queryClient.setQueryData(['job', project?.id], updated);
    },
    ...useQueryWithRedirect(),
  });

  // Save project
  const saveProject = (data: ProjectInfo) => {
    if (!isDirty) return;
    updateMutation.mutateAsync({ id: project!.id.toString(), ...data });
  };

  // Listening for onJobDone event
  useEffect(() => {
    if (!project) return;

    socket.on('onJobDone', (job: Job) => {
      const { compiledAt, startedAt } = job;
      const updated = {
        ...job,
        submittedAt: new Date(job.submittedAt),
      };
      if (compiledAt) updated.compiledAt = new Date(compiledAt);
      if (startedAt) updated.startedAt = new Date(startedAt);

      queryClient.setQueryData(['job', project?.id], updated);
    });

    return () => {
      socket.off('onJobDone');
    };
  }, [socket, project]);

  // Create job
  const createJob = () => {
    if (!project) return;

    createMutation.mutateAsync(project.id.toString());
  };

  if (isLoading || !project || isJobLoading)
    return <Loader active size='big' />;

  return (
    <>
      <AnimatePresence>
        {isDirty && <SaveProject handleSubmit={handleSubmit(saveProject)} />}
      </AnimatePresence>

      <ProjectPageLayout code={code} language={language} setValue={setValue}>
        <div className='h-full hidden lg:w-[45%] p-10 lg:flex flex-col border-l-[.2px] border-[#1E1E1E] shrink gap-12'>
          <RiLogoutCircleFill
            className='w-10 h-10  cursor-pointer'
            onClick={() => navigate('/home')}
          />

          <div className='flex flex-col items-center justify-between h-full'>
            <div className='w-full flex justify-between items-center'>
              <h1 className='text-[28px] underline underline-offset-4 font-extrabold'>
                {toTitleCase(project.name)}
              </h1>

              <Select
                className='w-[250px]'
                formValidation={{
                  id: 'language',
                  register,
                  errors,
                  options: {
                    required: 'You have to select one language',
                  },
                }}
              >
                {Object.values(AvailableLanguages).map((l) => (
                  <option key={l} value={l}>
                    {toTitleCase(l)}
                  </option>
                ))}
              </Select>
            </div>

            <JobSection lastJobRan={lastJobRan} />

            <div className='flex flex-col items-center justify-center gap-4 w-full'>
              <EditDescription setValue={setValue} description={description} />
              <ActionSection
                createJob={createJob}
                disabled={
                  createMutation.isLoading ||
                  lastJobRan?.status === JobStatus.PENDING
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
