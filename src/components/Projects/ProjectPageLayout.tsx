import { ProjectPageLayoutProps } from '../../utils/types/props';
import CodeEditor from './CodeEditor';

const ProjectPageLayout: React.FC<ProjectPageLayoutProps> = ({
  code,
  language,
  setProjectInfo,
  children,
}) => {
  return (
    <div className='h-screen flex items-center justify-between font-inter'>
      <div className='h-full flex-shrink-1'>
        <CodeEditor
          code={code}
          language={language}
          setProjectInfo={setProjectInfo}
        />
      </div>

      {children}
    </div>
  );
};

export default ProjectPageLayout;
