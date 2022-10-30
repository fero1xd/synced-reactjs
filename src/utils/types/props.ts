import React from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { ClassNameValue } from 'tailwind-merge/dist/lib/join';
import {
  AvailableLanguages,
  ColorTheme,
  Job,
  PartialProject,
  Project,
  User,
} from '.';

export type ButtonProps = {
  children: React.ReactNode;
  className?: ClassNameValue;
  secondary?: boolean;
  [x: string]: any;
};

export type SelectProps = {
  children: React.ReactNode;
  className?: ClassNameValue;
  formValidation?: FormFieldProps<any> & {
    id: string;
    options: any;
  };
  [x: string]: any;
};

export type ThemeProviderProps = {
  initialTheme: ColorTheme;
  children: React.ReactNode;
};

export type InputFieldProps = {
  type?: string;
  formValidation?: FormFieldProps<any> & {
    id: string;
    options: any;
  };
  placeholder: string;
  className?: ClassNameValue;
  [x: string]: any;
};

export type FormFieldProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrorsImpl<T>;
};

export type AppProvidersProps = {
  user?: User;
  children?: React.ReactNode;
  setUser: (data: User | undefined) => void;
  modals: Modals;
  setModals: any;
};

export type Modals = {
  createProject: ModalData;
  confirmDeletion: ModalData;
};

export type ModalData = {
  show: boolean;
  data?: any;
};

export const defaultModalState: Modals = {
  createProject: {
    show: false,
  },
  confirmDeletion: {
    show: false,
  },
};

export type AppCoverProps = AppProvidersProps;

export type ProjectCardProps = {
  project: PartialProject;
};

export type ContextMenuProps = {
  top: number;
  left: number;
  project: PartialProject;
  editProject: (project: PartialProject) => void;
  deleteProject: (id: string) => void;
};

export type CodeEditorProps = {
  language: AvailableLanguages;
  code: string;
  setValue: UseFormSetValue<ProjectInfo>;
};

export type ProjectInfo = {
  code: string;
  description: string;
  language: AvailableLanguages;
};

export type ProjectPageLayoutProps = {
  code: string;
  language: AvailableLanguages;
  children: React.ReactNode;
  setValue: UseFormSetValue<ProjectInfo>;
};

export type EditDescriptionProps = {
  setValue: UseFormSetValue<ProjectInfo>;
  description: string;
};

export type UseProjectProps = {
  reset: UseFormReset<ProjectInfo>;
};

export type UseProjectReturnType = {
  isLoading: boolean;
  isError: boolean;
  project?: Project;
};

export type UseProject = (data: UseProjectProps) => UseProjectReturnType;

export type JobSectionProps = {
  lastJobRan?: Job;
};

export type ActionSectionProps = {
  createJob: () => void;
  disabled: boolean;
};

export type ProjectHeaderProps = {
  project: Project;
  formFieldProps: FormFieldProps<ProjectInfo>;
};
