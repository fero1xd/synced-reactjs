import { useNavigate } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { RiLogoutCircleFill } from 'react-icons/ri';
import {
  AvailableLanguages,
  Project,
  UpdateProjectParams,
} from '../../utils/types';
import Select from '../../components/Shared/Select';
import { ProjectInfo } from '../../utils/types/props';
import { toTitleCase } from '../../utils/helpers';
import ProjectPageLayout from '../../components/Project/ProjectPageLayout';
import EditDescription from '../../components/Project/EditDescription';
import ActionSection from '../../components/Project/ActionSection';
import useProject from '../../hooks/useProject';
import { useForm } from 'react-hook-form';
import SaveProject from '../../components/Project/SaveProject';
import { AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '../../utils/api';
import useQueryWithRedirect from '../../hooks/useQueryWithRedirect';

const ProjectPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, formState, reset, getValues, handleSubmit, setValue } =
    useForm<ProjectInfo>({
      reValidateMode: 'onBlur',
    });

  const { code, language, description } = getValues();
  const { errors, isDirty } = formState;

  const { isLoading, project } = useProject({ reset });

  const updateMutation = useMutation(
    (data: UpdateProjectParams) => updateProject(data),
    {
      onSuccess: (data: Project) => {
        queryClient.setQueryData(['projects', data.id.toString()], data);
        reset({
          code: data.code,
          description: data.description,
          language: data.language,
        });
      },
      ...useQueryWithRedirect(),
    }
  );

  const saveProject = (data: ProjectInfo) => {
    if (!isDirty) return;
    updateMutation.mutateAsync({ id: project!.id.toString(), ...data });
  };

  if (isLoading || !project) return <Loader active size='big' />;

  return (
    <>
      <AnimatePresence>
        {isDirty && <SaveProject handleSubmit={handleSubmit(saveProject)} />}
      </AnimatePresence>

      <ProjectPageLayout code={code} language={language} setValue={setValue}>
        <div className='h-full hidden lg:w-[40%] p-10 lg:flex flex-col border-l-[.2px] border-[#1E1E1E] shrink gap-12'>
          <RiLogoutCircleFill
            className='w-10 h-10  cursor-pointer'
            onClick={() => navigate('/home')}
          />

          <div className='flex flex-col items-center justify-between h-full'>
            <div className='w-full flex justify-between items-center'>
              <h1 className='text-[28px] underline underline-offset-4 font-extrabold'>
                {toTitleCase(project.name)}
              </h1>

              <Select
                className='w-[250px]'
                formValidation={{
                  id: 'language',
                  register,
                  errors,
                  options: {
                    required: 'You have to select one language',
                  },
                }}
              >
                {Object.values(AvailableLanguages).map((l) => (
                  <option key={l} value={l}>
                    {toTitleCase(l)}
                  </option>
                ))}
              </Select>
            </div>

            <EditDescription setValue={setValue} description={description} />

            <ActionSection />
          </div>
        </div>
      </ProjectPageLayout>
    </>
  );
};

export default ProjectPage;
