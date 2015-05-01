import { Flummox } from 'flummox';
import ChampionStore from './stores/ChampionStore';
import ChampionActions from './actions/ChampionActions';
import ItemStore from './stores/ItemStore';
import ItemActions from './actions/ItemActions';

class Flux extends Flummox {

  constructor() {
    super();

    const championActions = this.createActions('champions', ChampionActions);
    this.createStore('champions', ChampionStore, {championActions});

    const itemActions = this.createActions('items', ItemActions);
    this.createStore('items', ItemStore, {itemActions});

  }

}

export default Flux;

