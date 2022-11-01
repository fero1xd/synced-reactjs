import { ProjectPageLayoutProps } from '../../utils/types/props';
import CodeEditor from './CodeEditor';

const ProjectPageLayout: React.FC<ProjectPageLayoutProps> = ({
  code,
  language,
  children,
  setValue,
  isDirty,
  saveProject,
}) => {
  return (
    <div className='h-screen flex items-center justify-between font-inter'>
      <div className='h-full w-[100%] lg:w-[55%]'>
        <CodeEditor
          saveProject={saveProject}
          code={code}
          language={language}
          setValue={setValue}
          isDirty={isDirty}
        />
      </div>
      {children}
    </div>
  );
};

export default ProjectPageLayout;
