import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';
import Debug from 'debug';

const debug = Debug('actions:item');

class ItemActions extends Actions {

  async getItems(lang) {
    debug('getItems');
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/item.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default ItemActions;

