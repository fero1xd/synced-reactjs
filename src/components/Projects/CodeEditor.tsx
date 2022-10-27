import Editor from '@monaco-editor/react';
import { useContext } from 'react';
import { Loader } from 'semantic-ui-react';
import ThemeContext from '../../utils/context/ThemeContext';
import { CodeEditorProps, ProjectInfo } from '../../utils/types/props';

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  setProjectInfo,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Editor
      language={language}
      value={code}
      onChange={(val) =>
        setProjectInfo((prev: ProjectInfo) => ({ ...prev, code: val || '' }))
      }
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      loading={<Loader active size='small' content='Loading Editor' />}
      options={{
        autoDetectHighContrast: false,
        // readOnly: true,
        contextmenu: false,
        // cursorStyle: "line",
        // cursorWidth: 1,
        fontSize: 18,
        showUnused: true,
        // letterSpacing: 1,
        scrollbar: {
          vertical: 'hidden',
          verticalHasArrows: false,
          verticalScrollbarSize: 0,
          verticalSliderSize: 0,
        },
        fontWeight: 'thin',
        glyphMargin: false,
        guides: {
          highlightActiveIndentation: false,
          indentation: false,
        },
        lightbulb: {
          enabled: false,
        },
        // lineDecorationsWidth: 10,
        // lineHeight:22,
        lineNumbersMinChars: 3,
        overviewRulerBorder: false,
        padding: {
          top: 10,
          bottom: 10,
        },
        // find: {
        //   seedSearchStringFromSelection: true,
        // },
        // ideCursorInOverviewRuler: true,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
      wrapperProps={
        {
          // className: "rounded-3xl",
        }
      }
    />
  );
};

export default CodeEditor;
