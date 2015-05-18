import { Store } from 'flummox';
import { Map } from 'immutable';

class ChampionStore extends Store {
  constructor({ championActions }) {
    super();

    this.register(championActions.getChampions, this.handleChampions);
    this.register(championActions.getChampion, this.handleChampion);

    this.state = {
      champions: new Map(),
      champion: new Map()
    };
  }

  handleChampions(newChampions) {

    this.setState({
      champions: this.state.champions.merge(newChampions)
    });

  }

  handleChampion(newChampion) {
    const {lang, name, data} = newChampion;

    this.setState({
      champion: this.state.champion.mergeDeep({[lang]: {[name]: data}})
    });
  }

  getChampions(lang) {
    return this.state.champions.get(lang);
  }

  getChampion(lang, name) {
    if (this.state.champion.has(lang)) {
      return this.state.champion.get(lang).get(name);
    } else {
      return (void 0);
    }
  }

}

export default ChampionStore;

