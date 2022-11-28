import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { toTitleCase } from '../../../utils/helpers';
import { AvailableLanguages } from '../../../utils/types';
import { ProjectModalProps } from '../../../utils/types/props';
import ActionSection from '../../Project/ActionSection';
import EditDescription from '../../Project/EditDescription';
import JobSection from '../../Project/JobSection';
import Select from '../../Shared/Select';
import { useEffect } from 'react';
import Button from '../../Shared/Button';
import Collaborators from './Collaborators';

const ProjectModal: React.FC<ProjectModalProps> = ({
  createJob,
  disabled,
  jobs,
  handleClick,
  project,
  setValue,
  description,
  language,
  setShowJobOutput,
  clearJobs,
  isClearingJobs,
}) => {
  useEffect(() => {
    const handlePress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClick();
      }
    };
    window.addEventListener('keydown', handlePress);
    return () => {
      window.removeEventListener('keydown', handlePress);
    };
  }, [handleClick]);

  return (
    <>
      <motion.div
        initial={{
          x: '100vw',
        }}
        transition={{ duration: 0.5 }}
        animate={{
          x: '0',
        }}
        exit={{
          x: '100vw',
        }}
        className='fixed transition-colors duration-200 top-0 left-0 right-0 bottom-0 w-[vw] h-[vh]  bg-white dark:bg-darkAccent py-10 px-5 lg:px-10 overflow-y-auto flex flex-col'
        style={{
          zIndex: 999,
        }}
      >
        <MdClose
          className='w-5 h-5  cursor-pointer fill-black dark:fill-white'
          onClick={handleClick}
        />
        <div className='mt-12 flex-1 flex flex-col justify-between gap-16'>
          <div className='w-full flex justify-between items-center lg:hidden'>
            <h1 className='text-[25px] underline underline-offset-4 font-extrabold'>
              {toTitleCase(project.name)}
            </h1>

            <Select
              className='w-[150px] md:w-[200px] lg:w-[250px]'
              value={language}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setValue('language', e.target.value as AvailableLanguages, {
                  shouldDirty: true,
                });
              }}
            >
              {Object.values(AvailableLanguages).map((l) => (
                <option key={l} value={l}>
                  {toTitleCase(l)}
                </option>
              ))}
            </Select>
          </div>

          <div className='w-full flex flex-col justify-center gap-5 lg:gap-10'>
            <Collaborators project={project} />

            <JobSection
              jobs={jobs ?? []}
              showSeeAll={false}
              compact={true}
              setShowJobOutput={setShowJobOutput}
            />
          </div>
          <div className='w-full lg:hidden'>
            <EditDescription setValue={setValue} description={description} />
          </div>

          <div className='flex gap-3'>
            <ActionSection
              createJob={createJob}
              disabled={disabled}
              className=''
            />
            <Button
              secondary
              className={`rounded-lg ${
                disabled ? 'cursor-not-allowed' : ''
              } px-[20px] py-[12px]`}
              onClick={() => clearJobs.mutateAsync(project.id.toString())}
              disabled={isClearingJobs}
            >
              Clear Jobs
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectModal;
