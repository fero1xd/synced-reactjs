import Button from '../Shared/Button';

const ActionSection = () => {
  return (
    <div className='flex gap-4 items-center justify-center ml-auto transition-all ease-in-out duration-500'>
      <Button className='rounded-lg' secondary>
        Run
      </Button>
    </div>
  );
};

export default ActionSection;
