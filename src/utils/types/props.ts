import React from 'react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { AvailableLanguages, ColorTheme, PartialProject, User } from '.';

type ChangeEvent = (e: React.ChangeEvent<any>) => unknown;

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  secondary?: boolean;
  [x: string]: any;
};

export type SelectProps = {
  children: React.ReactNode;
  className?: string;
  formValidation?: FormFieldProps & {
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
  type?: 'text' | 'password' | 'email';
  formValidation?: FormFieldProps & {
    id: 'email' | 'password' | 'name' | 'description';
    options: any;
  };
  placeholder: string;
  [x: string]: any;
  className?: string;
};

export type FormFieldProps = {
  register: UseFormRegister<any>;
  errors: FieldErrorsImpl<{
    name: string;
    email: string;
    password: string;
  }>;
};

export type AppProvidersProps = {
  user?: User;
  children?: React.ReactNode;
  setUser: (data: User | undefined) => void;
  modals: Modals;
  setModals: any;
};

export type Modals = {
  createProject: {
    show: boolean;
    data?: any;
  };
  confirmDeletion: {
    show: boolean;
    data?: any;
  };
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
  setProjectInfo: (prev: any) => unknown;
};

export type ProjectInfo = {
  code: string;
  description: string;
  language: AvailableLanguages;
};

export type ProjectPageLayoutProps = {
  code: string;
  language: AvailableLanguages;
  setProjectInfo: (prev: any) => unknown;
  children: React.ReactNode;
};

export type EditDescriptionProps = {
  description: string;
  handleChange: ChangeEvent;
};
