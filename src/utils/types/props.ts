import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';
import { ClassNameValue } from 'tailwind-merge/dist/lib/join';
import {
  AvailableLanguages,
  ColorTheme,
  Job,
  PartialProject,
  Project,
  TransferOwnershipParams,
  UpdateProjectParams,
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
  [x: string]: ModalData;
};

export type ModalData = {
  show: boolean;
  data?: any;
};

export const defaultModalState: Modals = {
  createProject: {
    show: false,
  },
  projectDeleteConfirmation: {
    show: false,
  },
  projectOwnershipTransfer: {
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
  children: React.ReactNode;
  className?: ClassNameValue;
};

export type ProjectContextMenuProps = {
  top: number;
  left: number;
  project: PartialProject;
  deleteProject: (project: PartialProject) => void;
  editProject: (project: PartialProject) => void;
};

export type ContextMenuItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: ClassNameValue;
};

export type CodeEditorProps = {
  language: AvailableLanguages;
  code: string;
  setValue: UseFormSetValue<ProjectInfo>;
  isDirty: boolean;
  saveProject: () => void;
  project: Project;
};

export type ProjectInfo = {
  code: string;
  description?: string;
  language: AvailableLanguages;
};

export type ProjectPageLayoutProps = {
  code: string;
  language: AvailableLanguages;
  children: React.ReactNode;
  setValue: UseFormSetValue<ProjectInfo>;
  isDirty: boolean;
  saveProject: () => void;
  project: Project;
};

export type EditDescriptionProps = {
  setValue: UseFormSetValue<ProjectInfo>;
  description?: string;
};

export type UseProjectProps = {
  reset: UseFormReset<ProjectInfo>;
  code: string;
  language: AvailableLanguages;
  description?: string;
};

export type UseProjectReturnType = {
  isLoading: boolean;
  isError: boolean;
  project?: Project;
  updateProjectMutation: UseMutationResult<
    any,
    unknown,
    UpdateProjectParams,
    unknown
  >;
};

export type UseJobsReturnType = {
  areJobsLoading: boolean;
  isError: boolean;
  jobs?: Job[];
  createJobMutation: UseMutationResult<unknown, unknown, string, unknown>;

  clearJobs: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  isClearingJobs: boolean;
};

export type UseProject = (data: UseProjectProps) => UseProjectReturnType;
export type UseJobs = (
  setShowJobOutput: React.Dispatch<React.SetStateAction<Job | undefined>>,
  project?: Project,
  showJobOutput?: Job
) => UseJobsReturnType;

export type JobSectionProps = {
  jobs: Job[];
  showSeeAll?: boolean;
  compact?: boolean;
  onClick?: () => void;
  setShowJobOutput: React.Dispatch<React.SetStateAction<Job | undefined>>;
};

export type ActionSectionProps = {
  createJob: () => void;
  disabled: boolean;
  className?: ClassNameValue;
};

export type ProjectHeaderProps = {
  project: Project;
  formFieldProps?: FormFieldProps<ProjectInfo>;
};

export type ProjectModalProps = {
  createJob: () => void;
  disabled: boolean;
  jobs: Job[];
  handleClick: () => void;
  project: Project;
  setValue: UseFormSetValue<ProjectInfo>;
  description?: string;
  language: string;
  setShowJobOutput: React.Dispatch<React.SetStateAction<Job | undefined>>;
  clearJobs: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  isClearingJobs: boolean;
};

export type JobOutputProps = {
  job: Job;
  setShowJobOutput: React.Dispatch<React.SetStateAction<Job | undefined>>;
};

export type HomeHeaderProps = {
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
};

export type ProjectsSectionProps = { isPublic: boolean };

export type CollaboratorsProps = {
  project: Project;
};

export type ConfirmationModalProps = {
  children: React.ReactNode;
  handleConfirm: () => void;
  handleCancelation: () => void;
};
