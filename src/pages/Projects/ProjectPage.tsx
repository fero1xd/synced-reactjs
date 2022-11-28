import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AvailableLanguages, Job, JobStatus } from '../../utils/types';
import { ProjectInfo } from '../../utils/types/props';
import ProjectPageLayout from '../../components/Project/ProjectPageLayout';
import EditDescription from '../../components/Project/EditDescription';
import ActionSection from '../../components/Project/ActionSection';
import useProject from '../../hooks/useProject';
import { useForm } from 'react-hook-form';
import SaveProject from '../../components/Project/SaveProject';
import { AnimatePresence } from 'framer-motion';
import JobSection from '../../components/Project/JobSection';
import { useState } from 'react';
import ProjectHeader from '../../components/Project/ProjectHeader';
import ProjectModal from '../../components/Modals/Project/ProjectModal';
import useJobs from '../../hooks/useJobs';
import JobOutput from '../../components/Modals/JobOutput';

const ProjectPage = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [showJobOutput, setShowJobOutput] = useState<Job>();

  // Form validation
  const { register, formState, reset, watch, handleSubmit, setValue } =
    useForm<ProjectInfo>({
      reValidateMode: 'onBlur',
    });

  // Extracting state from form hook
  const { code, language, description } = watch();
  const { errors, isDirty, dirtyFields } = formState;

  // Fetching project & getting update job mutation
  const { isLoading, project, updateProjectMutation } = useProject({
    reset,
    setValue,
  });

  // Fetching jobs & creating job mutation & setting and updating job output modal
  const { areJobsLoading, jobs, createJobMutation, clearJobs, isClearingJobs } =
    useJobs(setShowJobOutput, project, showJobOutput);

  // Save project
  const saveProject = (data: ProjectInfo) => {
    // If form fields are actually changed
    if (!isDirty) return;
    const fields: {
      code?: string;
      description?: string;
      language?: AvailableLanguages;
    } = {};

    if (dirtyFields.code) fields.code = data.code;
    if (dirtyFields.description) fields.description = data.description;
    if (dirtyFields.language) fields.language = data.language;

    updateProjectMutation.mutateAsync({
      id: project!.id.toString(),
      ...fields,
    });
  };

  // Create job
  const createJob = () => {
    if (!project) return;
    createJobMutation.mutateAsync(project.id.toString());
  };

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.emit('onCodeUpdate', {
  //     projectId: project?.id,
  //     code,
  //   });
  // }, [socket, code]);

  // isLoading: wether project is loading
  // project: The project
  // areJobsLoading: wether last job is loading
  if (isLoading || !project || areJobsLoading || !jobs)
    return <Loader active size='big' />;

  return (
    <>
      <AnimatePresence>
        {isDirty && <SaveProject handleSubmit={handleSubmit(saveProject)} />}
        {showJobOutput && (
          <JobOutput job={showJobOutput} setShowJobOutput={setShowJobOutput} />
        )}
      </AnimatePresence>

      <ProjectPageLayout
        saveProject={handleSubmit(saveProject)}
        code={code}
        language={language}
        setValue={setValue}
        isDirty={isDirty}
        project={project}
      >
        <GiHamburgerMenu
          className='w-7 h-7 fixed lg:hidden right-24 top-10'
          style={{ zIndex: 1000 }}
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
              handleClick={() => setShowOverlay(false)}
              project={project}
              setValue={setValue}
              description={description}
              language={language}
              setShowJobOutput={setShowJobOutput}
              clearJobs={clearJobs}
              isClearingJobs={isClearingJobs}
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
              onClick={() => setShowOverlay(true)}
              setShowJobOutput={setShowJobOutput}
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
