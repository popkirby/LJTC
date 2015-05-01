import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';


class RuneActions extends Actions {

  async getRunes(lang) {
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/rune.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default RuneActions;

