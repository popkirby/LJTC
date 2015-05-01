import { Store } from 'flummox';
import { Map } from 'immutable';

class ItemStore extends Store {
  constructor({ itemActions }) {
    super();

    this.register(itemActions.getItems, this.handleItems);

    this.state = {
      items: new Map()
    };
  }

  handleItems(newItems) {

    this.setState({
      items: this.state.items.merge(newItems)
    });

  }

  getItems(lang) {
    return this.state.items.get(lang);
  }

  getItem(lang, itemId) {
    return this.state.items.get(lang).get('data').get(itemId);
  }

}

export default ItemStore;

