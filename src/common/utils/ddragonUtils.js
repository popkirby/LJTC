import url from 'url';

const BASE_URL = 'http://ddragon.leagueoflegends.com';

export function getDDragonUrl(path) {
  if (typeof path === 'undefined') return BASE_URL;

  return url.resolve(BASE_URL, path);
}

export function infoString(str) {
  return str.replace(/<.*?>/g, '\n').replace(/\n+/g, '\n').trim();
}

