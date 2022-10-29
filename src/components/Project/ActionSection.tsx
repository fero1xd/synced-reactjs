import { ActionSectionProps } from '../../utils/types/props';
import Button from '../Shared/Button';

const ActionSection: React.FC<ActionSectionProps> = ({
  createJob,
  disabled,
}) => {
  return (
    <div className='flex gap-4 items-center justify-center ml-auto transition-all ease-in-out duration-500'>
      <Button
        className={`rounded-lg ${disabled ? 'cursor-not-allowed' : ''} `}
        onClick={createJob}
        disabled={disabled}
      >
        Run
      </Button>
    </div>
  );
};

export default ActionSection;
