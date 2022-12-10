import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../utils/context/AuthContext';
import { ProjectContextMenuProps } from '../../../utils/types/props';
import ContextMenu from './ContextMenu';
import ContextMenuItem from './ContextMenuItem';

const ProjectContextMenu: React.FC<ProjectContextMenuProps> = ({
  project,
  top,
  left,
  deleteProject,
  editProject,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <ContextMenu top={top} left={left}>
      <ContextMenuItem onClick={() => navigate(`/project/${project?.id}`)}>
        View
      </ContextMenuItem>
      {project.owner.id === user?.id && (
        <>
          <ContextMenuItem onClick={() => editProject(project)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            className=' text-red-500'
            onClick={() => deleteProject(project)}
          >
            Delete
          </ContextMenuItem>
        </>
      )}
    </ContextMenu>
  );
};

export default ProjectContextMenu;
