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
  JAVASCRIPT = 'javascript',
  PYTHON = 'python',
}

export type PartialProject = {
  id: number;
  name: string;
  language: AvailableLanguages;
  description?: string;
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
