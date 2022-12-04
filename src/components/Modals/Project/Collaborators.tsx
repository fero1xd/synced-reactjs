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

const Collaborators: React.FC<CollaboratorsProps> = ({ project }) => {
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

  const samplePics = [
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  ];
  return (
    <div className='space-y-5 mb-5'>
      <h2 className='text-[18px] lg:text-[20px] font-bold drop-shadow-md'>
        Collaborators
      </h2>

      <div className='w-full max-h-[150px] bg-white dark:bg-input rounded-lg shadow-sm flex flex-col'>
        {project.collaborators.map((collaborator, i) => (
          <div
            key={collaborator.id}
            onContextMenu={(e) => handleContextMenu(e, collaborator)}
            className='flex items-center gap-4 hover:bg-[#f8f7f7] dark:hover:bg-darkAccent px-7 py-6 cursor-pointer transition-all duration-200 ease-in-out'
            onClick={() => {
              navigate(`/developer/${collaborator.id}`);
            }}
          >
            <img
              className='w-7 h-7 lg:w-10 lg:h-10 rounded-full object-cover'
              src={samplePics[i]}
              alt='Photo'
            />
            <div className='flex items-center gap-2'>
              {collaborator.id === project.owner.id && (
                <FaCrown fill='#FFD700' className='w-5 h-5' />
              )}
              <div className='flex items-center gap-1'>
                <h3 className='font-medium font-inter text-md lg:text-[15px]'>
                  {collaborator.name}
                </h3>
                {collaborator.id === user!.id && (
                  <p className='text-gray-400 text-sm italic'>(Me)</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {showContextMenu && (
          <ContextMenu top={points.y} left={points.x} className='w-[200px]'>
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
