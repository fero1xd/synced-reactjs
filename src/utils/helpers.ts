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

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return (
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':') +
    ' ' +
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
  );
}
