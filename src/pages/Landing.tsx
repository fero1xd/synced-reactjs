import { FaCode, FaLongArrowAltRight } from 'react-icons/fa';
import Button from '../components/Shared/Button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className='h-screen flex items-center justify-center bg-white dark:bg-darkAccent
       text-black dark:text-white flex-col gap-10 transition-colors duration-300 font-inter'
    >
      <div className='text-heading font-bold text-center drop-shadow-md'>
        <h1>Get Started With Online</h1>
        <h1 className='text-center block'>
          Coding <FaCode className='inline' />
        </h1>
      </div>

      <Button onClick={() => navigate('login')}>
        <span className='drop-shadow-md'>Get Started</span>{' '}
        <FaLongArrowAltRight className='absolute right-5 drop-shadow-md' />
      </Button>
    </div>
  );
};

export default Landing;
