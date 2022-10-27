import { createContext } from 'react';
import { defaultModalState, Modals } from '../types/props';

type ModalContextType = {
  modals: Modals;
  setModals: any;
};

export default createContext<ModalContextType>({
  modals: defaultModalState,
  setModals: () => {},
});
