import { toTitleCase } from '../../utils/helpers';
import { AvailableLanguages } from '../../utils/types';
import { ProjectHeaderProps } from '../../utils/types/props';
import Select from '../Shared/Select';

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  formFieldProps,
}) => {
  const { register, errors } = formFieldProps;
  return (
    <div className='w-full flex justify-between items-center'>
      <h1 className='text-[25px] underline underline-offset-4 font-extrabold'>
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
        defaultValue={project.language}
      >
        {Object.values(AvailableLanguages).map((l) => (
          <option key={l} value={l}>
            {toTitleCase(l)}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ProjectHeader;
