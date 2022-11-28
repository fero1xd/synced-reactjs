import { ColorTheme, Job, SetShowModalParams } from './types';
import { Modals } from './types/props';

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatDate = (date: Date, hideSeconds?: boolean) => {
  const newDate = new Date(date);
  return !hideSeconds
    ? [
        padTo2Digits(newDate.getHours()),
        padTo2Digits(newDate.getMinutes()),
      ].join(':') +
        ' ' +
        [
          padTo2Digits(newDate.getDate()),
          padTo2Digits(newDate.getMonth() + 1),
          newDate.getFullYear(),
        ].join('/')
    : [
        padTo2Digits(newDate.getDate()),
        padTo2Digits(newDate.getMonth() + 1),
        newDate.getFullYear(),
      ].join('/');
};

export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');

    if (typeof storedPrefs === 'string') {
      return storedPrefs as ColorTheme;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  // Our default theme
  return process.env.REACT_APP_DEFAULT_THEME! as ColorTheme;
};

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export const setShowModal = (params: SetShowModalParams) => {
  const { setModals, name, show, data } = params;
  setModals((prev: Modals) => ({
    ...prev,
    [name]: { show, data: data || {} },
  }));
};

export const convertJob = (job: Job) => {
  const { compiledAt, startedAt } = job;

  const updated = {
    ...job,
    submittedAt: new Date(job.submittedAt),
  };
  if (compiledAt) updated.compiledAt = new Date(compiledAt);
  if (startedAt) updated.startedAt = new Date(startedAt);

  return updated;
};
