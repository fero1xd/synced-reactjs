import { AvailableLanguages } from './types';

const map = new Map<AvailableLanguages, string>();
map.set(
  AvailableLanguages.PYTHON,
  'https://cdn-icons-png.flaticon.com/512/5968/5968350.png'
);
map.set(
  AvailableLanguages.JAVASCRIPT,
  'https://cdn-icons-png.flaticon.com/512/5968/5968322.png'
);
map.set(
  AvailableLanguages.JAVA,
  'https://cdn-icons-png.flaticon.com/512/5968/5968282.png'
);
map.set(
  AvailableLanguages.CPP,
  'https://cdn-icons-png.flaticon.com/512/6132/6132222.png'
);

export default map;
