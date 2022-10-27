import Button from '../Shared/Button';

const ActionSection: React.FC<{ handleSubmit: () => void }> = ({
  handleSubmit,
}) => {
  return (
    <div className='flex gap-4 items-center justify-center ml-auto'>
      <Button className='rounded-lg' secondary>
        Run
      </Button>
      <Button className='rounded-lg' onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default ActionSection;
