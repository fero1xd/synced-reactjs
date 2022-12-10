import { twMerge } from 'tailwind-merge';
import { ActionSectionProps } from '../../utils/types/props';
import Button from '../Shared/Button';
import { BsFillGearFill } from 'react-icons/bs';

const ActionSection: React.FC<ActionSectionProps> = ({
  createJob,
  disabled,
  className,
  setShowOverlay,
  showSettings,
}) => {
  return (
    <div className='flex gap-4 items-center justify-center ml-auto transition-all ease-in-out duration-500'>
      {showSettings && (
        <Button
          className={twMerge(
            `rounded-lg ${
              disabled ? 'cursor-not-allowed' : ''
            } px-[20px] py-[12px] bg-gray-700 disabled:bg-gray-700 hover:bg-gray-800`,
            className
          )}
          onClick={() => setShowOverlay!(true)}
        >
          <BsFillGearFill className='mr-2 mt-1' />
          Settings
        </Button>
      )}
      <Button
        className={twMerge(
          `rounded-lg ${
            disabled ? 'cursor-not-allowed' : ''
          } px-[35px] py-[12px]`,
          className
        )}
        onClick={createJob}
        disabled={disabled}
      >
        Run
      </Button>
    </div>
  );
};

export default ActionSection;
