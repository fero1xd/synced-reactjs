import { AvailableLanguages } from './types';

const map = new Map<AvailableLanguages, string>();
map.set(
  AvailableLanguages.PYTHON,
  'https://cdn-fero.tk/synced/icons/python.png'
);
map.set(
  AvailableLanguages.JAVASCRIPT,
  'https://cdn-fero.tk/synced/icons/nodejs.png'
);

export default map;
