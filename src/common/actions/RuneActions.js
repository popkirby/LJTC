import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';
import Debug from 'debug';

const debug = Debug('actions:rune');

class RuneActions extends Actions {

  async getRunes(lang) {
    debug('getRunes');
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/rune.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default RuneActions;

