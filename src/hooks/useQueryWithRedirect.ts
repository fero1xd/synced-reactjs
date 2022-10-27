import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../utils/context/AuthContext';
import { useContext } from 'react';
import ModalContext from '../utils/context/ModalContext';
import { Modals } from '../utils/types/props';
import { useQueryClient } from '@tanstack/react-query';

const useQueryWithRedirect = (custom?: any) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const { setModals } = useContext(ModalContext);
  const client = useQueryClient();

  return {
    retry: false,
    onError: (err: AxiosError) => {
      const status = err.response?.status!;

      if (status === 403) {
        client.clear();
        updateUser(undefined);
        navigate('/login');
      } else if (status !== 401) {
        navigate('/home');
      }
      setModals((prev: Modals) => {
        const n = { ...prev };

        Object.values(n).forEach((m) => {
          m.show = false;
          m.data = undefined;
        });

        return {
          ...n,
        };
      });
    },
    ...custom,
  };
};

export default useQueryWithRedirect;
