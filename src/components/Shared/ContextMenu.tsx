import { useNavigate } from 'react-router-dom';
import { ContextMenuProps } from '../../utils/types/props';

const ContextMenu: React.FC<ContextMenuProps> = ({
  top,
  left,
  project,
  deleteProject,
  editProject,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`font-inter rounded-md absolute w-[160px] bg-white dark:bg-[#292929] shadow-md`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <ul className='px-2 py-4'>
        <li
          className='p-3 cursor-pointer hover:bg-[#d8d8d8] dark:hover:bg-[#4b4b4b] rounded-md'
          onClick={() => navigate(`/project/${project?.id}`)}
        >
          View
        </li>
        <li
          className='p-3 cursor-pointer hover:bg-[#d8d8d8] dark:hover:bg-[#4b4b4b] rounded-md'
          onClick={() => editProject(project)}
        >
          Edit
        </li>
        <li
          className='p-3 cursor-pointer text-red-500 hover:bg-[#d8d8d8] dark:hover:bg-[#4b4b4b] rounded-md'
          onClick={() => deleteProject(project.id.toString())}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
