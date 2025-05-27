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
import sandpackDependencies from "@/config/sandpackDependencies.json";

const reactTsSnippetContent = `
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CounterState {
  count: number;
  lastUpdated: Date | null;
}

export default function App(): JSX.Element {
  const [state, setState] = useState<CounterState>({
    count: 0,
    lastUpdated: null
  });

  const handleClick = (): void => {
    const now = new Date();
    const newCount = state.count + 1;
    
    setState({
      count: newCount,
      lastUpdated: now
    });
    
    const timestamp = format(now, 'HH:mm:ss', { locale: fr });
    toast.success(\`🎯 Clic #\${newCount} à \${timestamp}\`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🚀 Compteur React TypeScript
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <p style={{ fontSize: '32px', margin: '10px 0', fontWeight: 'bold' }}>
          Total: <span style={{ color: '#007bff' }}>{state.count}</span>
        </p>
        {state.lastUpdated && (
          <p style={{ fontSize: '14px', color: '#6c757d' }}>
            Dernière mise à jour: {format(state.lastUpdated, 'dd/MM/yyyy à HH:mm:ss', { locale: fr })}
          </p>
        )}
      </div>
      
      <button 
        onClick={handleClick}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
          fontWeight: '600'
        }}
      >
        🎯 Cliquez-moi !
      </button>
    </div>
  );
}
`.trim();

const advancedReactSnippet = `
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce((term) => {
    if (term.length > 2) {
      toast(\`🔍 Recherche: "\${term}"\`, {
        icon: '🔍',
        duration: 1500,
      });
    }
  }, 500);

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast.error("⚠️ Veuillez saisir une tâche");
      return;
    }

    const todo = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos(prev => [...prev, todo]);
    setNewTodo("");
    toast.success("✅ Tâche ajoutée !");
  };

  const toggleTodo = (id) => {
    setTodos(prev => 
      prev.map(todo => {
        if (todo.id === id) {
          const updated = { ...todo, completed: !todo.completed };
          toast(updated.completed ? "✅ Tâche terminée !" : "🔄 Tâche réactivée", {
            icon: updated.completed ? '✅' : '🔄',
          });
          return updated;
        }
        return todo;
      })
    );
  };

  const fetchRandomQuote = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Chargement de la citation...");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const quotes = [
        "La vie est belle 🌸",
        "Code is poetry 💻",
        "Stay hungry, stay foolish 🚀",
        "Think different 💡"
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      toast.success(\`💫 \${randomQuote}\`, {
        id: loadingToast,
        duration: 4000,
      });
    } catch (error) {
      toast.error("❌ Erreur lors du chargement", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      
      <h1>📝 Todo App Avancée</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="Nouvelle tâche..."
          style={{
            padding: '10px',
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '300px'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Ajouter
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={fetchRandomQuote}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#6c757d' : '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Chargement...' : '💫 Citation Random'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: todo.completed ? '#d4edda' : '#f8f9fa',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? '✅' : '⏳'} {todo.text}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#6c757d', fontStyle: 'italic' }}>
          Aucune tâche pour le moment
        </p>
      )}
    </div>
  );
}
`.trim();

const vanillaJsSnippet = `
import { debounce } from "lodash";
import { format } from "date-fns";

const app = document.getElementById('app');

let counter = 0;

const debouncedIncrement = debounce(() => {
  counter++;
  updateDisplay();
  showNotification(\`Compteur: \${counter}\`);
}, 200);

function updateDisplay() {
  const now = new Date();
  const timestamp = format(now, 'dd/MM/yyyy HH:mm:ss');
  
  app.innerHTML = \`
    <div style="text-align: center; padding: 20px; font-family: Arial;">
      <h1>🎯 Compteur Vanilla JS</h1>
      <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <h2 style="color: #007bff; margin: 0;">\${counter}</h2>
        <p style="color: #6c757d; font-size: 14px;">Dernière mise à jour: \${timestamp}</p>
      </div>
      <button id="increment-btn" style="
        padding: 15px 30px;
        font-size: 16px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">
        Incrémenter (avec debounce)
      </button>
      <div id="notifications" style="margin-top: 20px;"></div>
    </div>
  \`;
  
  document.getElementById('increment-btn').addEventListener('click', debouncedIncrement);
}

function showNotification(message) {
  const notifications = document.getElementById('notifications');
  const notification = document.createElement('div');
  notification.style.cssText = \`
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    padding: 10px;
    margin: 5px 0;
    border-radius: 4px;
    animation: fadeIn 0.3s ease;
  \`;
  notification.textContent = message;
  
  notifications.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

const style = document.createElement('style');
style.textContent = \`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
\`;
document.head.appendChild(style);

updateDisplay();
`.trim();

const enhancedSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React TypeScript",
      name: "react-ts",
      meta: "live react typescript",
      sandpackTemplate: "react-ts",
      sandpackTheme: "light",
      snippetFileName: "/App.tsx",
      snippetLanguage: "tsx",
      initialSnippetContent: reactTsSnippetContent,
      dependencies: {
        ...sandpackDependencies.presets.reactTs.dependencies,
        "date-fns": "^2.30.0"
      },
      devDependencies: sandpackDependencies.presets.reactTs.devDependencies,
    },
    {
      label: "React Avancé",
      name: "react-advanced",
      meta: "live react advanced",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: advancedReactSnippet,
      dependencies: sandpackDependencies.presets.reactFlexible.dependencies,
    },
    {
      label: "Vanilla JavaScript",
      name: "vanilla",
      meta: "live vanilla javascript",
      sandpackTemplate: "vanilla",
      sandpackTheme: "light",
      snippetFileName: "/index.js",
      snippetLanguage: "javascript",
      initialSnippetContent: vanillaJsSnippet,
      dependencies: sandpackDependencies.presets.vanilla.dependencies,
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
            sandpackConfig: enhancedSandpackConfig,
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