import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';
import Debug from 'debug';

const debug = Debug('actions:summonerSpells');

class SummonerSpellActions extends Actions {

  async getSummonerSpells(lang) {
    debug('getSummonerSpells');
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/summoner.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default SummonerSpellActions;

