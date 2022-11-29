import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import { getProjects } from '../../utils/api';
import ModalContext from '../../utils/context/ModalContext';
import { setShowModal } from '../../utils/helpers';
import { PartialProject } from '../../utils/types';
import ProjectCard from '../Project/ProjectCard';
import { motion } from 'framer-motion';
import { ProjectsSectionProps } from '../../utils/types/props';
import ProjectContextMenu from '../Shared/ContextMenu/ProjectContextMenu';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isPublic }) => {
  const { setModals } = useContext(ModalContext);
  const {
    isLoading,
    isError,
    data: projects,
  } = useQuery(
    ['projects', isPublic ? 'public' : 'private'],
    () => getProjects(isPublic),
    useQueryWithRedirect()
  );

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const [selectedProject, setSelectedProject] = useState<PartialProject>();

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    project: PartialProject
  ) => {
    e.preventDefault();

    setShowContextMenu(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
    setSelectedProject(project);
  };

  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader active inline='centered' size='medium'>
          <span className='font-inter text-gray-500 text-sm'>
            Fetching Projects
          </span>
        </Loader>
      ) : isError ? (
        <h1 className='font-inter text-red-500 tracking-wide'>
          An Error Occured!
        </h1>
      ) : projects?.length === 0 ? (
        <h1 className='font-inter text-gray-500 tracking-wide'>No Projects!</h1>
      ) : (
        <div className='w-full flex flex-col gap-7 overflow-y-auto items-center max-h-[300px] px-4'>
          <AnimatePresence>
            {projects?.map((project) => (
              <motion.div
                key={project.id}
                className='w-full'
                onContextMenu={(e) => handleContextMenu(e, project)}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
          {showContextMenu && (
            <ProjectContextMenu
              top={points.y}
              left={points.x}
              project={selectedProject!}
              deleteProject={(project) => {
                setShowModal({
                  setModals,
                  name: 'projectDeleteConfirmation',
                  show: true,
                  data: { project },
                });
              }}
              editProject={(project) => {
                setShowModal({
                  setModals,
                  name: 'createProject',
                  show: true,
                  data: { project },
                });
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
