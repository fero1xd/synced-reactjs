import Button from '../Shared/Button';
import { motion } from 'framer-motion';
import { ConfirmationModalProps } from '../../utils/types/props';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  handleConfirm,
  handleCancelation,
}) => {
  return (
    <div
      className='px-4 w-[100%] h-[100%] absolute top-0 left-0 flex items-center justify-center bg-modal font-inter'
      style={{ zIndex: 99999 }}
    >
      <motion.div
        initial={{ opacity: 0, y: '-3.5rem' }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0, y: '-3.5rem' }}
        className='w-[400px] md:w-[600px] lg:w-[600px] absolute top-14 px-7 py-5 flex items-center justify-center text-center'
      >
        <div
          className='px-7 py-5 rounded-md bg-[#f6f6f6] dark:bg-[#121212] flex flex-col gap-6 md:flex-row
         lg:flex-row items-center justify-between relative text-black dark:text-white'
        >
          <h1 className='text-md tracking-wider'>{children}</h1>

          <div className='flex gap-4 items-center justify-center'>
            <Button className='px-5 py-2' onClick={handleConfirm}>
              Yes
            </Button>
            <Button className='px-5 py-2' secondary onClick={handleCancelation}>
              No
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
