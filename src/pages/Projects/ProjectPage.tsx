import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';
import { getProject } from '../../utils/api';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { AvailableLanguages, Project } from '../../utils/types';
import Select from '../../components/Shared/Select';
import { ProjectInfo } from '../../utils/types/props';
import { toTitleCase } from '../../utils/helpers';
import ProjectPageLayout from '../../components/Projects/ProjectPageLayout';
import EditDescription from '../../components/Projects/EditDescription';
import ActionSection from '../../components/Projects/ActionSection';

const ProjectPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    code: '',
    description: '',
    language: AvailableLanguages.PYTHON,
  });

  const { code, description, language } = projectInfo;

  const { isLoading, data: project } = useQuery(
    ['projects', params.id],
    () => getProject(params.id!),
    useQueryWithRedirect({
      cacheTime: 0,
      onSuccess: (data: Project) => {
        setProjectInfo({
          code: data.code,
          description: data.description || '',
          language: data.language,
        });
      },
    })
  );

  if (isLoading || !project) return <Loader active size='big' />;

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setProjectInfo((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleSubmit = () => console.log(projectInfo);

  return (
    <ProjectPageLayout
      code={code}
      language={language}
      setProjectInfo={setProjectInfo}
    >
      <div className='h-full w-[900px] p-10 flex flex-col'>
        <RiLogoutCircleFill
          className='w-10 h-10  cursor-pointer'
          onClick={() => navigate('/home')}
        />

        <div className='w-full mt-24 flex justify-between items-center'>
          <h1 className='text-heading underline underline-offset-4 font-extrabold'>
            {toTitleCase(project.name)}
          </h1>

          <Select id='language' className='w-[300px]' onChange={handleChange}>
            {Object.values(AvailableLanguages).map((l) => (
              <option key={l} value={l} selected={l === project.language}>
                {toTitleCase(l)}
              </option>
            ))}
          </Select>
        </div>

        <EditDescription
          handleChange={handleChange}
          description={description}
        />

        <ActionSection handleSubmit={handleSubmit} />
      </div>
    </ProjectPageLayout>
  );
};

export default ProjectPage;
