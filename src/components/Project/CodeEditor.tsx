import Editor, { Monaco } from '@monaco-editor/react';
import { useContext, useEffect, useRef } from 'react';
import { Loader } from 'semantic-ui-react';
import ThemeContext from '../../utils/context/ThemeContext';
import { CodeEditorProps } from '../../utils/types/props';
import debounce from 'debounce';

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  setValue,
}) => {
  const { theme } = useContext(ThemeContext);
  const editorRef = useRef<Monaco>();

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => editorRef.current.layout();

  return (
    <Editor
      language={language}
      value={code}
      onChange={(val) => {
        setValue('code', val || '', { shouldDirty: true });
      }}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      loading={<Loader active size='small' content='Loading Editor' />}
      onMount={(editor) => (editorRef.current = editor)}
      options={{
        handleResize: () => {},
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
