import { PartialProject, Project } from './types';

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function convertToPartialProject(data: Project) {
  return {
    id: data.id,
    name: data.name,
    language: data.language,
    description: data.description,
  } as PartialProject;
}
