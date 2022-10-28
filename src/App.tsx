import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import { User } from './utils/types';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { defaultModalState, Modals } from './utils/types/props';
import AuthenticatedRoute from './components/Routes/AuthenticatedRoute';
import Landing from './pages/Landing';
import Register from './pages/Register';
import AppCover from './components/AppCover/AppCover';
import Login from './pages/Login';
import Home from './pages/Home';
import PublicRoute from './components/Routes/PublicRoute';
import ProjectPage from './pages/Projects/ProjectPage';
import CreateProject from './components/Modals/CreateProject';
import ConfirmationModal from './components/Modals/ConfirmationModal';

const App = () => {
  const [user, setUser] = useState<User>();
  const [modals, setModals] = useState<Modals>(defaultModalState);

  const { createProject, confirmDeletion } = modals;

  return (
    <>
      <AppCover
        user={user}
        setUser={setUser}
        modals={modals}
        setModals={setModals}
      >
        <AnimatePresence>
          {createProject.show && <CreateProject />}
          {confirmDeletion.show && <ConfirmationModal />}
        </AnimatePresence>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<AuthenticatedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/project/:id' element={<ProjectPage />} />
          </Route>
        </Routes>
        <ToastContainer theme='dark' position='bottom-center' limit={2} />
      </AppCover>
    </>
  );
};

export default App;
