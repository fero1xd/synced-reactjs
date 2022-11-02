import { toTitleCase } from '../../utils/helpers';
import { AvailableLanguages } from '../../utils/types';
import { ProjectHeaderProps } from '../../utils/types/props';
import Select from '../Shared/Select';

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  formFieldProps,
}) => {
  return (
    <div className='w-full flex justify-between items-center'>
      <h1 className='text-[25px] underline underline-offset-4 font-extrabold drops-shadow-md'>
        {toTitleCase(project.name)}
      </h1>

      <Select
        className='w-[250px]'
        defaultValue={project.language}
        formValidation={
          formFieldProps && {
            id: 'language',
            register: formFieldProps.register,
            errors: formFieldProps.errors,
            options: {
              required: 'You have to select one language',
            },
          }
        }
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
