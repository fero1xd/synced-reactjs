import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { toTitleCase } from '../../utils/helpers';
import { AvailableLanguages } from '../../utils/types';
import { ProjectModalProps } from '../../utils/types/props';
import ActionSection from '../Project/ActionSection';
import EditDescription from '../Project/EditDescription';
import JobSection from '../Project/JobSection';
import Select from '../Shared/Select';

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
}) => {
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
        className='fixed transition-colors duration-200 top-0 left-0 right-0 bottom-0 w-[vw] h-[vh]  bg-white dark:bg-darkAccent py-10 px-5 lg:px-10  overflow-y-auto'
        style={{
          zIndex: 999,
        }}
      >
        <MdClose
          className='w-5 h-5  cursor-pointer fill-black dark:fill-white'
          onClick={handleClick}
        />
        <div className='mt-12 flex flex-col gap-16'>
          <div className='w-full flex justify-between items-center lg:hidden'>
            <h1 className='text-[25px] underline underline-offset-4 font-extrabold'>
              {toTitleCase(project.name)}
            </h1>

            <Select
              className='w-[150px] lg:w-[250px]'
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

          <JobSection
            jobs={jobs ?? []}
            showSeeAll={false}
            compact={true}
            setShowJobOutput={setShowJobOutput}
          />

          <div className='w-full lg:hidden'>
            <EditDescription setValue={setValue} description={description} />
          </div>

          <ActionSection
            createJob={createJob}
            disabled={disabled}
            className='px-8 py-3 mr-auto'
          />
        </div>
      </motion.div>
    </>
  );
};

export default ProjectModal;
