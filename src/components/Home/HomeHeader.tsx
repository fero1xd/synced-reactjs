import { useContext } from 'react';
import { FaDotCircle, FaSearch } from 'react-icons/fa';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import AuthContext from '../../utils/context/AuthContext';
import ModalContext from '../../utils/context/ModalContext';
import { setShowModal } from '../../utils/helpers';
import { HomeHeaderProps } from '../../utils/types/props';

const HomeHeader: React.FC<HomeHeaderProps> = ({ isPublic, setIsPublic }) => {
  const { setModals } = useContext(ModalContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1 className='text-[40px] font-inter font-extrabold text-center drop-shadow-md tracking-[.15em] flex gap-4 flex-shrink-0'>
        Hello
        <span className='underline text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600'>
          {user?.name}
        </span>
      </h1>

      <div className='w-full flex justify-between items-center mt-32 px-4 flex-shrink-0'>
        <Button
          className='rounded-md px-12'
          onClick={() =>
            setShowModal({ setModals, name: 'createProject', show: true })
          }
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

      <div className='mt-8 w-full flex items-center justify-center gap-6 px-4 flex-shrink-0'>
        <Input placeholder='Search' className='w-full  rounded-xl' />
        <FaSearch className='w-9 h-9' cursor='pointer' />
      </div>

      <div className='w-full mt-12 mb-12 flex justify-center flex-col items-center'>
        <div className='flex gap-5 font-inria text-lg mb-3 font-normal tracking-wide'>
          <p
            className={`p-2 cursor-pointer border-b-2 ${
              !isPublic ? 'border-blue-600' : 'border-transparent'
            }  hover:border-blue-600 transition-all duration-200`}
            onClick={() => setIsPublic(false)}
          >
            Private
          </p>
          <p
            className={`p-2 border-b-2 ${
              isPublic ? 'border-red-600' : 'border-transparent'
            }  hover:border-red-600 cursor-pointer transition-all duration-200`}
            onClick={() => setIsPublic(true)}
          >
            Public
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
