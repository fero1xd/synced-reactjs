export type ColorTheme = 'light' | 'dark';

export type CreateUserParams = UserCredentialParams &
  Partial<{
    name: string;
  }>;

export type UserCredentialParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
};

export enum AvailableLanguages {
  PYTHON = 'python',
  JAVASCRIPT = 'javascript',
  JAVA = 'java',
  CPP = 'cpp',
}

export type PartialProject = {
  id: number;
  name: string;
  language: AvailableLanguages;
  isPublic: boolean;
  description?: string;
  owner: User;
  collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
};

export type Project = PartialProject & {
  code: string;
};

export type CreateProjectParams = {
  name: string;
  language: AvailableLanguages;
  description?: string;
};

export type UpdateProjectParams = {
  id: string;
  name?: string;
  language?: AvailableLanguages;
  description?: string;
  code?: string;
};

export type TransferOwnershipParams = {
  projectId: string;
  userToTransferEmail: string;
};
export type RemoveCollaboratorParams = {
  projectId: number;
  userToRemoveEmail: string;
};

export enum JobStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Job = {
  id: string;
  submittedAt: Date;
  status: JobStatus;
  executedBy: User;
  output?: string;
  startedAt?: Date;
  compiledAt?: Date;
};

export type SetShowModalParams = {
  setModals: any;
  name: string;
  show: boolean;
  data?: any;
};
