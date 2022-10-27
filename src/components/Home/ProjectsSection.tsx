import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import { getProjects } from '../../utils/api';
import ModalContext from '../../utils/context/ModalContext';
import { PartialProject } from '../../utils/types';
import { Modals } from '../../utils/types/props';
import ProjectCard from '../Projects/ProjectCard';
import ContextMenu from '../Shared/ContextMenu';

const ProjectsSection = () => {
  const { setModals } = useContext(ModalContext);
  const {
    isLoading,
    isError,
    data: projects,
  } = useQuery(['projects'], getProjects, useQueryWithRedirect());
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
        <div className='w-full flex flex-col gap-10 overflow-y-auto items-center max-h-[300px] px-4'>
          {projects?.map((project) => (
            <div
              key={project.id}
              className='w-full'
              onContextMenu={(e) => handleContextMenu(e, project)}
            >
              <ProjectCard project={project} />
            </div>
          ))}

          {showContextMenu && (
            <ContextMenu
              top={points.y}
              left={points.x}
              project={selectedProject!}
              deleteProject={(id) => {
                setModals((prev: Modals) => {
                  return {
                    ...prev,
                    confirmDeletion: {
                      show: true,
                      data: id,
                    },
                  };
                });
              }}
              editProject={(project) => {
                setModals((prev: Modals) => {
                  return {
                    ...prev,
                    createProject: {
                      show: true,
                      data: project,
                    },
                  };
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
