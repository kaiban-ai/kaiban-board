const sportsNewsOpenai = () => {
    return {
        code: `
import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@kaibanjs/tools';

// Define tools
const searchTool = new TavilySearchResults({
    maxResults: 1,
    apiKey: 'ENV_TAVILY_API_KEY',
});

// Define agents
const searchAgent = new Agent({
    name: 'Scout',
    role: 'Information Gatherer',
    goal: 'Find up-to-date information about the given sports query.',
    background: 'Research',
    tools: [searchTool],
});

const contentCreator = new Agent({
    name: 'Writer',
    role: 'Content Creator',
    goal: 'Generate a comprehensive articles about any sports event.',
    background: 'Journalism',
    tools: [], 
});

// Define tasks
const searchTask = new Task({
    description: \`Search for detailed information about the sports query: {sportsQuery}.\`,
    expectedOutput: 'Detailed information about the sports event. Key players, key moments, final score and other usefull information.',
    agent: searchAgent
});

const writeTask = new Task({
    description: \`Using the gathered information, write a detailed article about the sport event.\`,
    expectedOutput: 'A well-structured and engaging sports article. With a title, introduction, body, and conclusion. Markdown format.',
    agent: contentCreator,
    externalValidationRequired: true
});

// Team to coordinate the agents
const team = new Team({
    name: 'Sports News Team',
    agents: [searchAgent,contentCreator ],
    tasks: [searchTask, writeTask],
    inputs: { sportsQuery: 'Who won the Copa America in 2024?' },
    env: {OPENAI_API_KEY: 'ENV_OPENAI_API_KEY'}
});


team.start();
`,
        keys: [
            {key: "ENV_TAVILY_API_KEY", value: "NEXT_PUBLIC_TAVILY_API_KEY"},
            {key: "ENV_OPENAI_API_KEY", value: "NEXT_PUBLIC_OPENAI_API_KEY"}
        ],
        user: 'AI Champions Team'
    };
};

export default sportsNewsOpenai;