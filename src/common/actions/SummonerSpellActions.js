import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';


class SummonerSpellActions extends Actions {

  async getSummonerSpells(lang) {
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/summoner.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default SummonerSpellActions;

