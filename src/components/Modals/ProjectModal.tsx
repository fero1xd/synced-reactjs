import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader } from 'semantic-ui-react';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import { getAllJobs } from '../../utils/api';
import { Job } from '../../utils/types';
import ActionSection from '../Project/ActionSection';
import JobSection from '../Project/JobSection';

const ProjectModal: React.FC<{
  createJob: () => void;
  disabled: boolean;
  jobs: Job[];
}> = ({ createJob, disabled, jobs }) => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0.8,
          x: '100vw',
        }}
        transition={{ duration: 0.5 }}
        animate={{
          opacity: 1,
          x: '0',
        }}
        exit={{
          opacity: 0.8,
          x: '100vw',
        }}
        className='fixed transition-colors duration-200 w-[100%] h-[100%]  bg-white dark:bg-darkAccent lg:hidden py-10 px-10  overflow-y-auto'
      >
        <div className='mt-10'>
          <ActionSection
            createJob={createJob}
            disabled={disabled}
            className='px-8 py-3 mr-auto'
          />
          <JobSection jobs={jobs ?? []} showSeeAll={false} compact={true} />
        </div>
      </motion.div>
    </>
  );
};

export default ProjectModal;
