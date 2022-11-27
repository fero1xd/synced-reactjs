import axios, { AxiosRequestConfig } from 'axios';
import {
  CreateProjectParams,
  CreateUserParams,
  Job,
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

export const getUser = () => axiosClient.get<User>('/auth/status', config);

export const getProjects = (isPublic: boolean) =>
  axiosClient
    .get<PartialProject[]>(`/projects/${isPublic ? 'public' : ''}`, config)
    .then((res) => res.data);

export const getProject = (id: string) =>
  axiosClient.get<Project>(`/projects/${id}`, config).then((res) => res.data);

export const deleteProject = (id: string) =>
  axiosClient.delete(`/projects/${id}`, config);

export const createProject = (data: CreateProjectParams) =>
  axiosClient.post<Project>(`/projects`, data, config).then((res) => res.data);

export const updateProject = (data: UpdateProjectParams) =>
  axiosClient
    .patch(`/projects/${data.id}`, data, config)
    .then((res) => res.data);

export const getLatestJob = (id: string) =>
  axiosClient.get<Job>(`/jobs/${id}/latest`, config).then((res) => res.data);

export const createJob = (id: string) =>
  axiosClient
    .post<Job>(`/jobs`, { projectId: id }, config)
    .then((res) => res.data);

export const getAllJobs = (id: string) =>
  axiosClient.get<Job[]>(`/jobs/${id}`, config).then((res) => res.data);

export const clearJobs = (projectId: string) =>
  axiosClient.delete(`/jobs/${projectId}/clear`, config);
