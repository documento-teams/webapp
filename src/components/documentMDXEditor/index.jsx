import { useState, useEffect } from "react";

import {
  MDXEditor,
  toolbarPlugin,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  InsertSandpack,
  DiffSourceToggleWrapper,
  UndoRedo,
} from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

import PropTypes from "prop-types";

const defaultSnippetContent = `
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;


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

const DocumentMDXEditor = ({ content = "# Hello World" }) => {
  const [markdown, setMarkdown] = useState(content);

  useEffect(() => {
    setMarkdown(content);
  }, [content]);

  return (
    <MDXEditor
      markdown={markdown}
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),

        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),

        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
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
                    <>
                      <InsertCodeBlock />

                      <InsertSandpack />

                      <DiffSourceToggleWrapper>
                        <UndoRedo />
                      </DiffSourceToggleWrapper>
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
    />
  );
};

DocumentMDXEditor.propTypes = {
  content: PropTypes.string.isRequired,
};

export default DocumentMDXEditor;
