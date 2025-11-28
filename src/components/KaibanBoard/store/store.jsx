import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import toast from 'react-hot-toast';
import {
  encryptKeys,
  extractTeamName,
  findEnvValues,
  findSingleEnvValue,
} from '../utils/helper';
import { resumeCreationOpenai } from '../assets/teams/resume_creation';

// INFO: For code evaluation
import { Agent, Task, Team } from 'kaibanjs';
import {
  Serper,
  WolframAlphaTool,
  ExaSearch,
  GithubIssues,
  Firecrawl,
  JinaUrlToMarkdown,
  SimpleRAG,
  WebsiteSearch,
  PdfSearch,
  TextFileSearch,
  ZapierWebhook,
  MakeWebhook,
  SimpleRAGRetrieve,
  RAGToolkit,
} from '@kaibanjs/tools';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { SearchApi } from '@langchain/community/tools/searchapi';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { DallEAPIWrapper, OpenAIEmbeddings } from '@langchain/openai';
import { createStep, createWorkflow } from '@kaibanjs/workflow';
import OpenAI from 'openai';
import { StructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
// TODO: Remove this import and delete the tools folder
import { SerperTool } from '../tools';

const createAgentsPlaygroundStore = (initialState = {}) => {
  return create(
    devtools(
      subscribeWithSelector((set, get) => ({
        //states
        teamStore: null,
        code: null,
        errorState: { hasError: false, error: null },
        selectedTab: 0,

        isActivityOpen: false,
        isExecutionDialogOpen: false,
        isCelebrationDialogOpen: false,

        selectedTask: null,
        isTaskDetailsDialogOpen: false,

        db: null,
        isShareDialogOpen: false,
        isLoadingShare: false,
        isShareUrlDialogOpen: false,
        shareUrl: '',

        isMissingKeysDialogOpen: false,

        isChatBotOpen: false,

        uiSettings: {
          showFullScreen: true,
          showExampleMenu: false,
          showShareOption: false,
          showSettingsOption: false,
          showExampleTeams: false,
          maximizeConfig: {
            isActive: false,
            scrollPosition: 0,
          },
          isPreviewMode: true,
          showSimpleShareOption: true,
          showWelcomeInfo: true,
          selectedTab: 0,
          isChatbotFloating: false,
        },

        defaultEnvVars: [],

        keys: [],
        isOpenSettingsDialog: false,

        project: {
          name: 'Untitled Project',
          user: { name: 'Anonymous' },
        },

        teams: [],

        exampleTeams: [],

        ...initialState, // Merge initial state

        //actions
        setTeamStoreAction: teamStore => set({ teamStore }),

        setCodeAction: code => {
          try {
            const createTeam = code => {
              try {
                let valueToEvaluate = code;

                // Define allowed modules
                const allowedModules = [
                  'Agent',
                  'Task',
                  'Team',
                  'TavilySearchResults',
                  'SearchApi',
                  'DallEAPIWrapper',
                  'Serper',
                  'WolframAlphaTool',
                  'ExaSearch',
                  'GithubIssues',
                  'Firecrawl',
                  'JinaUrlToMarkdown',
                  'SimpleRAG',
                  'WebsiteSearch',
                  'PdfSearch',
                  'TextFileSearch',
                  'ZapierWebhook',
                  'MakeWebhook',
                  'SimpleRAGRetrieve',
                  'RAGToolkit',
                  'MemoryVectorStore',
                  'OpenAIEmbeddings',
                  'OpenAI',
                  'StructuredTool',
                  'z',
                  'createStep',
                  'createWorkflow',
                ];

                // Check if allowed modules are imported
                allowedModules.forEach(module => {
                  const usageRegex = new RegExp(`\\b${module}\\b`, 'g');
                  const importRegex = new RegExp(
                    `import\\s+.*\\b${module}\\b.*from\\s+['"].*['"]\\s*;?`,
                    'g'
                  );
                  if (
                    usageRegex.test(valueToEvaluate) &&
                    !importRegex.test(valueToEvaluate)
                  ) {
                    throw new Error(
                      `Missing required import for used module: ${module}`
                    );
                  }
                });

                // Remove import statements - handles indented imports
                valueToEvaluate = valueToEvaluate.replace(
                  /^\s*import\s+.*;?$/gm,
                  ''
                );

                // Replace the team start function
                valueToEvaluate = valueToEvaluate.replace(
                  /.*?\b(\w+)\s*\.\s*start\(\)(?:\s*\.then\(\s*\(.*?\)\s*=>\s*\{[\s\S]*?\}\s*\))?;?/g,
                  ''
                );

                // Add the team return statements
                let teamNames = [];
                valueToEvaluate.replace(
                  /(const|let|var)\s+(\w+)\s*=\s*new\s+Team\s*\([^)]*\)\s*;/g,
                  (match, decl, name) => {
                    teamNames.push(name);
                    return match;
                  }
                );
                valueToEvaluate =
                  valueToEvaluate +
                  '\n' +
                  teamNames.map(name => `return ${name};`).join('\n');

                // Get keys
                const { keys } = get();

                // Replace keys with their corresponding values
                if (keys && keys.length > 0) {
                  keys.forEach(({ key, value }) => {
                    const keyRegex = new RegExp(
                      key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                      'g'
                    );
                    valueToEvaluate = valueToEvaluate.replace(keyRegex, value);
                  });
                }

                // Create the function and evaluate
                const func = new Function(
                  'Agent',
                  'Task',
                  'Team',
                  'TavilySearchResults',
                  'SearchApi',
                  'DallEAPIWrapper',
                  'WolframAlphaTool',
                  'SerperTool',
                  'Serper',
                  'ExaSearch',
                  'GithubIssues',
                  'Firecrawl',
                  'JinaUrlToMarkdown',
                  'SimpleRAG',
                  'WebsiteSearch',
                  'PdfSearch',
                  'TextFileSearch',
                  'ZapierWebhook',
                  'MakeWebhook',
                  'SimpleRAGRetrieve',
                  'RAGToolkit',
                  'MemoryVectorStore',
                  'OpenAIEmbeddings',
                  'OpenAI',
                  'StructuredTool',
                  'z',
                  'createStep',
                  'createWorkflow',
                  valueToEvaluate
                );
                const team = func(
                  Agent,
                  Task,
                  Team,
                  TavilySearchResults,
                  SearchApi,
                  DallEAPIWrapper,
                  WolframAlphaTool,
                  SerperTool,
                  Serper,
                  ExaSearch,
                  GithubIssues,
                  Firecrawl,
                  JinaUrlToMarkdown,
                  SimpleRAG,
                  WebsiteSearch,
                  PdfSearch,
                  TextFileSearch,
                  ZapierWebhook,
                  MakeWebhook,
                  SimpleRAGRetrieve,
                  RAGToolkit,
                  MemoryVectorStore,
                  OpenAIEmbeddings,
                  OpenAI,
                  StructuredTool,
                  z,
                  createStep,
                  createWorkflow
                );

                return team;
              } catch (error) {
                console.error('Invalid code:', error);
                set({ errorState: { hasError: true, error: error.message } });
              }
            };

            const team = createTeam(code);
            if (team && typeof team.useStore === 'function') {
              const store = team.useStore(team);
              if (store) {
                const { setTeamStoreAction } = get();
                setTeamStoreAction(store);
                set({
                  code,
                  selectedTab: 0,
                  errorState: { hasError: false, error: null },
                });
              }
            }
          } catch (error) {
            console.error('Invalid code:', error);
            set({ errorState: { hasError: true, error: error.message } });
          }
        },

        setTabAction: selectedTab => set({ selectedTab }),

        setActivityOpenAction: isActivityOpen => set({ isActivityOpen }),
        setExecutionDialogOpenAction: isExecutionDialogOpen =>
          set({ isExecutionDialogOpen }),
        setCelebrationDialogOpenAction: isCelebrationDialogOpen =>
          set({ isCelebrationDialogOpen }),

        setTaskDetailsDialogOpenAction: isTaskDetailsDialogOpen =>
          set({ isTaskDetailsDialogOpen }),
        setSelectedTaskAction: selectedTask => {
          set({ selectedTask, isTaskDetailsDialogOpen: true });
        },

        initDbAction: () => {
          const firebaseConfig = {
            apiKey: findSingleEnvValue('FIREBASE_API_KEY'),
            authDomain: findSingleEnvValue('FIREBASE_AUTH_DOMAIN'),
            projectId: findSingleEnvValue('FIREBASE_PROJECT_ID'),
            storageBucket: findSingleEnvValue('FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: findSingleEnvValue(
              'FIREBASE_MESSAGING_SENDER_ID'
            ),
            appId: findSingleEnvValue('FIREBASE_APP_ID'),
            measurementId: findSingleEnvValue('FIREBASE_MEASUREMENT_ID'),
          };

          const initFirebase = () => {
            if (!getApps().length) {
              return initializeApp(firebaseConfig);
            } else {
              return getApp();
            }
          };

          const app = initFirebase();
          const db = getFirestore(app);
          set({ db });
        },
        setShareDialogOpenAction: isShareDialogOpen =>
          set({ isShareDialogOpen }),
        setShareUrlDialogOpenAction: isShareUrlDialogOpen =>
          set({ isShareUrlDialogOpen }),
        shareTeamAction: async userName => {
          set({ isLoadingShare: true });

          const { keys, db, code } = get();

          try {
            const encryptedKeys = await encryptKeys(keys);
            // console.log('Encrypted keys:', encryptedKeys);

            const docRef = await addDoc(collection(db, 'share'), {
              code: code,
              keys: encryptedKeys,
              user: { name: userName },
            });
            // console.log("Document written with ID: ", docRef.id);

            const url = `${window.location.origin}/share/${docRef.id}`;
            await navigator.clipboard.writeText(url);

            // Primero cerramos el diálogo de compartir
            set({
              isLoadingShare: false,
              isShareDialogOpen: false,
            });

            // Luego, después de un breve retraso, abrimos el diálogo de URL
            setTimeout(() => {
              set({
                shareUrl: url,
                isShareUrlDialogOpen: true,
              });
            }, 300); // Pequeño retraso para asegurar que el primer diálogo se cierre completamente

            toast.success(
              'Your team has been shared! URL copied to clipboard.'
            );
          } catch (error) {
            set({ isLoadingShare: false, isShareDialogOpen: false });
            toast.error('Failed to process encryption or document creation.');
            console.error(
              'Failed to process encryption or document creation:',
              error
            );
          }
        },
        simpleShareAction: async () => {
          try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);

            toast.success(
              `The URL is copied! Just paste it to share your team.`
            );
          } catch (error) {
            toast.error('Failed to share the team.');
          }
        },

        setMissingKeysDialogOpenAction: isMissingKeysDialogOpen =>
          set({ isMissingKeysDialogOpen }),

        setChatBotOpenAction: isChatBotOpen => set({ isChatBotOpen }),

        setUiSettingsAction: newSettings =>
          set(state => ({
            uiSettings: { ...state.uiSettings, ...newSettings },
          })),
        toggleMaximizeAction: () => {
          set(state => {
            const isMaximized = !state.uiSettings.maximizeConfig.isActive;
            const scrollPosition = isMaximized
              ? window.scrollY
              : state.uiSettings.maximizeConfig.scrollPosition;

            return {
              uiSettings: {
                ...state.uiSettings,
                isMaximized,
                maximizeConfig: {
                  isActive: isMaximized,
                  scrollPosition,
                },
              },
            };
          });

          const { uiSettings } = get();

          if (uiSettings.maximizeConfig.isActive) {
            document.body.classList.add('overflow-hidden');
            window.scrollTo(0, 0);
            setTimeout(() => {
              document.querySelector('header').classList.add('hidden');
            }, 100);
          } else {
            document.body.classList.remove('overflow-hidden');
            window.scrollTo(0, uiSettings.maximizeConfig.scrollPosition);
            document.querySelector('header').classList.remove('hidden');
          }
        },

        initDefaultEnvVarsAction: () => {
          const { keys, defaultEnvVars } = get();

          if (Array.isArray(defaultEnvVars) && defaultEnvVars.length > 0) {
            // Create a Set of existing keys for O(1) lookup
            const existingKeySet = new Set(keys.map(k => k.key));

            // Filter and process new environment variables
            const envVars = findEnvValues(defaultEnvVars || []).filter(
              envVar => !existingKeySet.has(envVar.key)
            );

            // Only update if we have new keys to add
            if (envVars.length > 0) {
              set({ keys: [...keys, ...envVars] });
            }
          }
        },

        setKeysAction: keys => set({ keys }),
        setSettingsDialogOpenAction: isOpenSettingsDialog =>
          set({ isOpenSettingsDialog }),

        setProjectAction: project => set({ project }),
        checkAndSetProject: () => {
          const { project, code, setProjectAction } = get();

          if (project.name === 'Untitled Project') {
            const name = extractTeamName(code);
            if (name) {
              setProjectAction({ ...project, name });
            }
          }
          if (project.user.name === 'Anonymous') {
            setProjectAction({
              ...project,
              user: { name: 'AI Champions Team' },
            });
          }
        },

        setExampleCodeAction: exampleCode => {
          const { setCodeAction, initDefaultEnvVarsAction } = get();

          const team = exampleCode();
          const code = team.code;
          const keys = findEnvValues(team.keys || []);
          const user = team.user;
          const name = extractTeamName(code);

          const project = {
            name: name || 'Untitled Project',
            user: { name: user || 'Anonymous' },
          };
          set({ keys, project });

          initDefaultEnvVarsAction();

          setCodeAction(code);
        },

        setTeamAction: team => {
          const { setTeamStoreAction } = get();
          setTeamStoreAction(team.store);

          const project = {
            name: team.store.getState().name || 'Untitled Project',
            user: { name: 'Anonymous' },
          };
          set({ project, selectedTab: 0 });
        },

        initAction: () => {
          const {
            code,
            setCodeAction,
            initDbAction,
            checkAndSetProject,
            teams,
            exampleTeams,
            setTeamAction,
            uiSettings,
            setTabAction,
            initDefaultEnvVarsAction,
            setExampleCodeAction,
          } = get();

          if (teams.length === 0 && !exampleTeams.length) {
            let initialCode = code;

            if (!code) {
              const team = resumeCreationOpenai();
              const keys = findEnvValues(team.keys || []);
              const user = team.user;
              const project = {
                name: 'Untitled Project',
                user: { name: user || 'Anonymous' },
              };
              initialCode = team.code;
              set({ keys, project });
            }

            setCodeAction(initialCode);
            initDbAction();
            checkAndSetProject();

            if (uiSettings.selectedTab !== 0) {
              setTimeout(() => {
                setTabAction(uiSettings.selectedTab);
              });
            }
          } else if (exampleTeams.length) {
            const team = exampleTeams[0];
            setExampleCodeAction(team);
          } else {
            const team = teams[0];
            setTeamAction(team);
          }

          initDefaultEnvVarsAction();
        },
      }))
    )
  );
};

export { createAgentsPlaygroundStore };
