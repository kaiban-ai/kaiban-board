import { ReactNode } from 'react';
import { Team } from 'kaibanjs';

// UI Settings Types
export interface MaximizeConfig {
  isActive: boolean;
  scrollPosition: number;
}

export interface UISettings {
  showFullScreen?: boolean;
  showExampleMenu?: boolean;
  showShareOption?: boolean;
  showSettingsOption?: boolean;
  showExampleTeams?: boolean;
  maximizeConfig?: MaximizeConfig;
  isPreviewMode?: boolean;
  showSimpleShareOption?: boolean;
  showWelcomeInfo?: boolean;
  selectedTab?: number;
  isChatbotFloating?: boolean;
}

// Key/Environment Variable Types
export interface KeyValue {
  key: string;
  value: string;
}

// Project Types
export interface Project {
  name: string;
  user: {
    name: string;
  };
}

// Example Team Types
export interface ExampleTeam {
  (): Team;
}

// Main Component Props
export interface KaibanBoardProps {
  uiSettings?: UISettings;
  code?: string;
  keys?: KeyValue[];
  project?: Project;
  teams?: Team[];
  defaultEnvVars?: string[];
  exampleTeams?: ExampleTeam[];
}

// Main Component Declaration
declare const KaibanBoard: React.FC<KaibanBoardProps>;

// Default Export
export default KaibanBoard;
