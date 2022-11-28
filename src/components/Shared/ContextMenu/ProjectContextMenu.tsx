import { useNavigate } from 'react-router-dom';
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

  return (
    <ContextMenu top={top} left={left}>
      <ContextMenuItem onClick={() => navigate(`/project/${project?.id}`)}>
        View
      </ContextMenuItem>
      <ContextMenuItem onClick={() => editProject(project)}>
        Edit
      </ContextMenuItem>
      <ContextMenuItem
        className=' text-red-500'
        onClick={() => deleteProject(project)}
      >
        Delete
      </ContextMenuItem>
    </ContextMenu>
  );
};

export default ProjectContextMenu;
