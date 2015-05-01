import { Flummox } from 'flummox';
import ChampionStore from './stores/ChampionStore';
import ChampionActions from './actions/ChampionActions';
import ItemStore from './stores/ItemStore';
import ItemActions from './actions/ItemActions';
import RuneStore from './stores/RuneStore';
import RuneActions from './actions/RuneActions';
import SummonerSpellStore from './stores/SummonerSpellStore';
import SummonerSpellActions from './actions/SummonerSpellActions';

class Flux extends Flummox {

  constructor() {
    super();

    const championActions = this.createActions('champions', ChampionActions);
    this.createStore('champions', ChampionStore, {championActions});

    const itemActions = this.createActions('items', ItemActions);
    this.createStore('items', ItemStore, {itemActions});

    const runeActions = this.createActions('runes', RuneActions);
    this.createStore('runes', RuneStore, {runeActions});

    const summonerSpellActions = this.createActions('summonerSpells', SummonerSpellActions);
    this.createStore('summonerSpells', SummonerSpellStore, {summonerSpellActions});

  }

}

export default Flux;

