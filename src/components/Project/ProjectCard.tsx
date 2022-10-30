import { FaEye } from 'react-icons/fa';
import { ProjectCardProps } from '../../utils/types/props';
import iconMap from '../../utils/iconMap';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const link = iconMap.get(project.language);
  const navigate = useNavigate();

  return (
    <>
      <div className='w-full max-h-[150px] dark:bg-input flex justify-between px-6 py-10 rounded-2xl shadow-md dark:shadow-sm gap-4'>
        <img src={link} alt='stock' className='w-[42px] h-[42px] block' />
        <div className='flex flex-col gap-3 flex-1 font-inria'>
          <div className='flex  items-center justify-between'>
            <h1 className='text-lg'>{project.name}</h1>
            <h1 className='font-inter text-xs text-gray-600'>
              {formatDate(new Date(project.updatedAt), true)}
            </h1>
          </div>
          <p className='break-all overflow-y-auto opacity-50 text-gray-400'>
            {project.description}
          </p>
        </div>
        <FaEye
          className='flex-shrink-0 justify-self-end w-6 h-6'
          cursor='pointer'
          onClick={() => navigate(`/project/${project.id}`)}
        />
      </div>
    </>
  );
};

export default ProjectCard;
