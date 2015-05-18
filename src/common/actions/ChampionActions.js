import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';
import Debug from 'debug';

const debug = Debug('actions:champion');

class ChampionActions extends Actions {

  async getChampions(lang) {
    debug('getChampions');
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/champion.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

  async getChampion(lang, name) {
    debug('getChampion');
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/champion/${name}.json`);
    const response = await fetch(url);
    return {
      'lang': lang,
      'name': name,
      'data': await response.json()
    };
  }

}

export default ChampionActions;

