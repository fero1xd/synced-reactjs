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
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0, y: '50px' }}
        className='w-[400px] md:w-[600px] lg:w-[600px] px-7 py-5 flex items-center justify-center text-center'
      >
        <div
          className='px-7 py-5 rounded-md bg-input flex flex-col gap-6 md:flex-row
        lg:flex-row items-center justify-between relative'
        >
          <h1 className='text-white text-md tracking-wider'>
            You have unsaved changes{' '}
          </h1>

          <div className='flex gap-4 items-center justify-center'>
            <Button className='px-5 py-2' onClick={handleSubmit}>
              Save
            </Button>
            <Button className='px-5 py-2' secondary>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SaveProject;
