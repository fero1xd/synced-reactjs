import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Job, JobStatus } from '../../utils/types';
import { ProjectInfo } from '../../utils/types/props';
import ProjectPageLayout from '../../components/Project/ProjectPageLayout';
import EditDescription from '../../components/Project/EditDescription';
import ActionSection from '../../components/Project/ActionSection';
import useProject from '../../hooks/useProject';
import { useForm } from 'react-hook-form';
import SaveProject from '../../components/Project/SaveProject';
import { AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import JobSection from '../../components/Project/JobSection';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import ProjectHeader from '../../components/Project/ProjectHeader';
import ProjectModal from '../../components/Modals/ProjectModal';
import { convertJob } from '../../utils/helpers';
import useJobs from '../../hooks/useJobs';
import JobOutput from '../../components/Modals/JobOutput';

const ProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showJobOutput, setShowJobOutput] = useState<Job>();

  // Form validation
  const { register, formState, reset, watch, handleSubmit, setValue } =
    useForm<ProjectInfo>({
      reValidateMode: 'onBlur',
    });

  // Extracting state from form hook
  const { code, language, description } = watch();
  const { errors, isDirty } = formState;

  // Fetching project & getting update job mutation
  const { isLoading, project, updateProjectMutation } = useProject({ reset });

  // Fetching jobs & creating job mutation & setting and updating job output modal
  const { areJobsLoading, jobs, createJobMutation } = useJobs(
    setShowJobOutput,
    project,
    showJobOutput
  );

  // Save project
  const saveProject = (data: ProjectInfo) => {
    // If form fields are actually changed
    if (!isDirty) return;
    updateProjectMutation.mutateAsync({ id: project!.id.toString(), ...data });
  };

  // Create job
  const createJob = () => {
    if (!project) return;
    createJobMutation.mutateAsync(project.id.toString());
  };

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
