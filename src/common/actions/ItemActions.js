import { Actions } from 'flummox';
import { LOL_VERSION } from '../config.js';
import { getDDragonUrl } from '../utils/ddragonUtils';


class ItemActions extends Actions {

  async getItems(lang) {
    const url = getDDragonUrl(`/cdn/${LOL_VERSION}/data/${lang}/item.json`);
    const response = await fetch(url);
    return { [lang] : await response.json() };
  }

}

export default ItemActions;

