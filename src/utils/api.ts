import axios, { AxiosRequestConfig } from 'axios';
import {
  CreateProjectParams,
  CreateUserParams,
  PartialProject,
  Project,
  UpdateProjectParams,
  User,
  UserCredentialParams,
} from './types';

const API_URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
});

const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axiosClient.post('/auth/register', data, config);

export const postLoginUser = (data: UserCredentialParams) =>
  axiosClient.post('/auth/login', data, config);

export const getUser = () => {
  console.log('fetching user');
  return axiosClient.get<User>('/auth/status', config);
};

export const getProjects = () =>
  axiosClient.get<PartialProject[]>('/projects', config).then((res) => {
    return res.data;
  });

export const getProject = (id: string) =>
  axiosClient.get<Project>(`/projects/${id}`, config).then((res) => {
    return res.data;
  });

export const deleteProject = (id: string) =>
  axiosClient.delete(`/projects/${id}`, config);

export const createProject = (data: CreateProjectParams) =>
  axiosClient.post<Project>(`/projects`, data, config).then((res) => {
    return res.data;
  });

export const updateProject = (data: UpdateProjectParams) =>
  axiosClient.patch(`/projects/${data.id}`, data, config).then((res) => {
    return res.data;
  });
