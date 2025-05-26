import {
  MDXEditor,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  ShowSandpackInfo,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  DiffSourceToggleWrapper,
  codeBlockPlugin,
  codeMirrorPlugin,
  sandpackPlugin,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

const defaultSnippetContent = `
  import { useState } from "react";
  export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  );
}
`.trim();

const simpleSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent,
    },
  ],
};

const DocuEditor = ({
  content = "# Hello World\n\nStart writing your document...",
  onChange,
  onSave,
  readOnly = false,
}) => {
  const [editorKey, setEditorKey] = useState(0);
  const [initialContent, setInitialContent] = useState(content);
  const currentContent = useRef(content);

  useEffect(() => {
    if (content !== currentContent.current) {
      setInitialContent(content);
      setEditorKey((prev) => prev + 1);
      currentContent.current = content;
    }
  }, [content]);

  const handleChange = useCallback(
    (newMarkdown) => {
      currentContent.current = newMarkdown;
      onChange?.(newMarkdown);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        if (onSave) {
          onSave(currentContent.current);
        }
      }
    },
    [onSave],
  );

  return (
    <div className="mdx-editor-wrapper" onKeyDown={handleKeyDown}>
      <MDXEditor
        key={editorKey}
        markdown={initialContent}
        onChange={handleChange}
        readOnly={readOnly}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: "javascript",
          }),
          sandpackPlugin({
            sandpackConfig: simpleSandpackConfig,
          }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              javascript: "JavaScript",
              jsx: "JSX",
              typescript: "TypeScript",
              tsx: "TSX",
              css: "CSS",
              html: "HTML",
              json: "JSON",
              python: "Python",
              bash: "Bash",
              sql: "SQL",
            },
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    when: (editor) => editor?.editorType === "sandpack",
                    contents: () => <ShowSandpackInfo />,
                  },
                  {
                    fallback: () => (
                      <div className="flex flex-wrap gap-2 items-center p-2">
                        <UndoRedo />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <BoldItalicUnderlineToggles />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <BlockTypeSelect />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <ListsToggle />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <CreateLink />
                        <InsertImage />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <InsertTable />
                        <InsertThematicBreak />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <InsertCodeBlock />
                        <InsertSandpack />
                        <div className="w-px h-6 bg-gray-300 mx-1" />

                        <DiffSourceToggleWrapper>
                          <button className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Source
                          </button>
                        </DiffSourceToggleWrapper>
                      </div>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]}
      />
    </div>
  );
};

DocuEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default DocuEditor;
