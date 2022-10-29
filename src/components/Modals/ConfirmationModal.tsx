import Button from '../Shared/Button';
import { useContext } from 'react';
import ModalContext from '../../utils/context/ModalContext';
import { Modals } from '../../utils/types/props';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../utils/api';
import { PartialProject } from '../../utils/types';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';

const ConfirmationModal = () => {
  const {
    setModals,
    modals: {
      confirmDeletion: { data },
    },
  } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const closeModal = () => {
    setModals((prev: Modals) => {
      return {
        ...prev,
        confirmDeletion: {
          show: false,
        },
      };
    });
  };

  const mutation = useMutation((id: string) => deleteProject(id), {
    onSuccess: (_, id) => {
      const data = queryClient.getQueryData(['projects']) as PartialProject[];

      queryClient.setQueryData(
        ['projects'],
        data.filter((pr) => pr.id.toString() !== id)
      );
    },
    ...useQueryWithRedirect(),
  });

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
        className='w-[400px] md:w-[600px] lg:w-[600px] absolute top-14 px-10 py-7 flex items-center justify-center text-center'
      >
        <div
          className='px-10 py-7 rounded-md bg-[#f6f6f6] dark:bg-[#121212] flex flex-col gap-6 md:flex-row
         lg:flex-row items-center justify-between relative text-black dark:text-white'
        >
          <h1 className='text-md tracking-wider'>
            Are you sure ? This Action is{' '}
            <span className='text-red-400'>Irreversible!</span>
          </h1>

          <div className='flex gap-4 items-center justify-center'>
            <Button
              className='px-5 py-2'
              onClick={() => {
                mutation.mutateAsync(data);
                closeModal();
              }}
            >
              Yes
            </Button>
            <Button className='px-5 py-2' secondary onClick={closeModal}>
              No
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
