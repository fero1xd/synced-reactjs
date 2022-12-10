import { useNavigate } from 'react-router-dom';
import { CollaboratorsProps } from '../../../utils/types/props';
import { useState, useEffect, useContext } from 'react';
import { User } from '../../../utils/types';
import ContextMenu from '../../Shared/ContextMenu/ContextMenu';
import ContextMenuItem from '../../Shared/ContextMenu/ContextMenuItem';
import { FaCrown } from 'react-icons/fa';
import AuthContext from '../../../utils/context/AuthContext';
import { setShowModal } from '../../../utils/helpers';
import ModalContext from '../../../utils/context/ModalContext';

const Collaborators: React.FC<CollaboratorsProps> = ({ project, isModal }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setModals } = useContext(ModalContext);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const [selectedCollaborator, setSelectedCollaborator] = useState<User>();

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    collaborator: User
  ) => {
    e.preventDefault();
    if (collaborator.id === user?.id || user?.id !== project.owner.id) return;

    setShowContextMenu(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
    setSelectedCollaborator(collaborator);
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const maxHeight = isModal
    ? 'max-h-[150px]'
    : 'md:max-h-[100px] lg:max-h-[100px]';

  return (
    <div className='space-y-3 w-full'>
      <h2 className='text-[18px] lg:text-[20px] font-bold drop-shadow-md text-gray-200'>
        Collaborators
      </h2>

      <div
        className={`w-full bg-white dark:bg-input rounded-lg shadow-sm flex flex-col ${maxHeight} ${
          isModal ? 'overflow-y-auto' : 'overflow-hidden'
        }`}
      >
        {project.collaborators.map((collaborator) => {
          return (
            <div
              key={collaborator.id}
              onContextMenu={(e) => handleContextMenu(e, collaborator)}
              className='border-b border-[#1C1C1C]  flex items-center gap-4 hover:bg-[#f8f7f7] dark:hover:bg-darkAccent px-7 py-6 cursor-pointer transition-all duration-200 ease-in-out'
              onClick={() => {
                navigate(`/developer/${collaborator.id}`);
              }}
            >
              <div className='flex items-center gap-2 justify-between w-full'>
                <div className='flex items-center gap-1'>
                  {collaborator.id === project.owner.id && (
                    <FaCrown fill='#FFD700' className='w-5 h-5 mr-2' />
                  )}
                  <h3 className='font-medium font-inter text-md lg:text-[15px]'>
                    {collaborator.name}
                  </h3>
                  {collaborator.id === user!.id && (
                    <p className='text-gray-400 text-sm italic'>(Me)</p>
                  )}
                </div>

                {collaborator.id !== user!.id && (
                  <div className='flex gap-2'>
                    <FaCrown className='hidden hover:block w-5 h-5 mr-2' />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {showContextMenu && (
          <ContextMenu
            top={points.y}
            left={points.x}
            className='w-[200px] z-50'
          >
            <ContextMenuItem
              onClick={() => {
                setShowModal({
                  setModals,
                  name: 'projectOwnershipTransfer',
                  show: true,
                  data: {
                    project,
                    selectedCollaborator,
                  },
                });
              }}
            >
              Make Owner
            </ContextMenuItem>

            <ContextMenuItem
              className='text-red-500'
              onClick={() => {
                setShowModal({
                  setModals,
                  name: 'projectCollaboratorRemove',
                  show: true,
                  data: {
                    project,
                    selectedCollaborator,
                  },
                });
              }}
            >
              Remove From Project
            </ContextMenuItem>
          </ContextMenu>
        )}
      </div>
    </div>
  );
};

export default Collaborators;
