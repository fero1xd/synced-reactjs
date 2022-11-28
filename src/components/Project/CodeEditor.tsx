import Editor from '@monaco-editor/react';
import { useContext, useEffect, useRef } from 'react';
import { Loader } from 'semantic-ui-react';
import ThemeContext from '../../utils/context/ThemeContext';
import { CodeEditorProps } from '../../utils/types/props';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as MonacoCollabExt from '@convergencelabs/monaco-collab-ext';
import { socket } from '../../utils/context/SocketContext';

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  setValue,
  project,
}) => {
  const { theme } = useContext(ThemeContext);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const contentManager = useRef<MonacoCollabExt.EditorContentManager>();
  const cursorManager = useRef<MonacoCollabExt.RemoteCursorManager>();

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleResize = () => editorRef.current?.layout();

  // useEffect(() => {
  //   if (!editorRef.current || !cursorManager.current) return;
  //   const pos = editorRef.current!.getPosition()!;

  //   socket.emit('onCodeUpdate', {
  //     projectId: project.id,
  //     code,
  //     position: {
  //       lineNumber: pos.lineNumber,
  //       column: pos.column,
  //     },
  //   });

  //   // console.log('ddd');
  //   socket.on('onCodeUpdate', (data) => {
  //     // contentManager.current?.replace( )
  //   });

  //   return () => {
  //     socket.off('onCodeUpdate');
  //   };
  // }, [socket, code, editorRef.current, cursorManager.current]);

  return (
    <Editor
      language={language}
      value={code}
      onChange={(value) => setValue('code', value || '', { shouldDirty: true })}
      theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
      loading={<Loader active size='small' content='Loading Editor' />}
      onMount={(editor) => {
        // contentManager.current = new MonacoCollabExt.EditorContentManager({
        //   editor,
        //   onInsert: (_, text) => {
        //     console.log('e');
        //     const code = editorRef.current!.getValue();
        //     setValue('code', code, { shouldDirty: true });
        //   },
        //   onDelete: () => {
        //     const code = editorRef.current!.getValue();
        //     setValue('code', code, { shouldDirty: true });
        //   },
        // });

        // cursorManager.current = new MonacoCollabExt.RemoteCursorManager({
        //   editor,
        //   tooltips: true,
        //   tooltipDuration: 2,
        // });

        editorRef.current = editor;
      }}
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
