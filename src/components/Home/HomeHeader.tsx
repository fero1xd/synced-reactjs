import { useContext } from 'react';
import { FaDotCircle, FaSearch } from 'react-icons/fa';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import AuthContext from '../../utils/context/AuthContext';
import ModalContext from '../../utils/context/ModalContext';
import { Modals } from '../../utils/types/props';

const HomeHeader = () => {
  const { setModals } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1 className='text-[40px] font-inter font-extrabold text-center drop-shadow-md tracking-[.15em] flex gap-4 flex-shrink-0'>
        Hello
        <span className='underline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600'>
          {user?.name}
        </span>
      </h1>

      <div className='w-full flex justify-between items-center mt-32 px-4 flex-shrink-0'>
        <Button
          className='rounded-md px-12'
          onClick={() => {
            setModals((prev: Modals) => {
              return {
                ...prev,
                createProject: {
                  show: true,
                },
              };
            });
          }}
        >
          New
        </Button>
        <Button
          secondary
          className='px-6 rounded-md flex items-center justify-center'
        >
          <FaDotCircle className='w-6 h-6' />
        </Button>
      </div>

      <div className='mt-10 w-full flex items-center justify-center gap-6 px-4 flex-shrink-0'>
        <Input placeholder='Search' className='w-full  rounded-xl' />
        <FaSearch className='w-9 h-9' cursor='pointer' />
      </div>
      <div className='w-full mt-16 mb-16 dark:border-[#1E1E1E] border-[.2px]'></div>
    </>
  );
};

export default HomeHeader;
