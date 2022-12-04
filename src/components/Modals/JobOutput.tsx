import { JobOutputProps } from '../../utils/types/props';
import { motion } from 'framer-motion';
import { JobStatus } from '../../utils/types';
import { MdClose } from 'react-icons/md';

const JobOutput: React.FC<JobOutputProps> = ({ job, setShowJobOutput }) => {
  const { id, output, status, executedBy } = job;

  return (
    <div
      className='px-4 w-[100%] h-[100%] fixed top-0 left-0 flex items-center justify-center bg-[#d5d1d1e3] dark:bg-modal font-inter'
      style={{ zIndex: 9999 }}
      onClick={() => setShowJobOutput(undefined)}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className='w-[600px]'
      >
        <div className='p-6 lg:p-10 rounded-md bg-[#f6f6f6] dark:bg-[#121212] flex flex-col gap-10 justify-center relative'>
          <div className='flex w-full items-center justify-between'>
            <h1 className='font-semibold font-inter text-lg'>Output</h1>
            <div className='flex items-center gap-3'>
              <p className='text-gray-400 opacity-80'>Job Id: {id}</p>
              <MdClose
                className='w-5 h-5  cursor-pointer fill-black dark:fill-white'
                onClick={() => setShowJobOutput(undefined)}
              />
            </div>
          </div>

          <div className='w-full flex flex-col gap-5'>
            <div className='space-y-1'>
              <p
                className={`text-gray-500 ${
                  status === JobStatus.PENDING
                    ? 'text-gray-500'
                    : status === JobStatus.ERROR
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                Status: {status.toUpperCase()}
              </p>
              <p className='text-gray-400'>Executed By - {executedBy.name}</p>
            </div>
            <code className='w-full font-sCode bg-input p-5 text-gray-300 rounded-md shadow-md max-h-[300px] overflow-y-auto'>
              {output ? (
                <p className='whitespace-pre-wrap'>{output}</p>
              ) : (
                'No output'
              )}
            </code>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobOutput;
