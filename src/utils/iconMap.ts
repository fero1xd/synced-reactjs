import { AvailableLanguages } from './types';

const map = new Map<AvailableLanguages, string>();
map.set(AvailableLanguages.PYTHON, '/images/python.png');
map.set(AvailableLanguages.JAVASCRIPT, '/images/nodejs.png');
map.set(AvailableLanguages.JAVA, '/images/java.png');

export default map;
