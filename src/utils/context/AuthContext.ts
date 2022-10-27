import { createContext } from 'react';
import { User } from '../types';

type AuthContextType = {
  user?: User;
  updateUser: (data: User | undefined) => void;
};

export default createContext<AuthContextType>({
  updateUser: () => {},
});
