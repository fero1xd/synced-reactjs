import { motion } from 'framer-motion';
import Button from '../Shared/Button';

const SaveProject: React.FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '5px',
        transform: 'translate(-50%, -10%)',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: '50px' }}
        animate={{ opacity: 1, y: '0' }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, y: '50px' }}
        className='w-[400px] md:w-[600px] lg:w-[600px] px-6 py-5 flex items-center justify-center text-center'
      >
        <div
          className='px-6 py-5 rounded-md bg-white dark:bg-input flex flex-col gap-3 lg:gap-6 md:flex-row
        lg:flex-row items-center justify-between relative text-black dark:text-white shadow-md'
        >
          <h1 className='text-md tracking-wider'>You have unsaved changes </h1>

          <div className='flex gap-4 items-center justify-center'>
            <Button className='px-5 py-2' onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaveProject;
