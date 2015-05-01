import { Store } from 'flummox';
import { Map } from 'immutable';

class SummonerSpellStore extends Store {
  constructor({ summonerSpellActions }) {
    super();

    this.register(summonerSpellActions.getSummonerSpells, this.handleSummonerSpells);

    this.state = {
      spells: new Map()
    };
  }

  handleSummonerSpells(newSummonerSpells) {

    this.setState({
      spells: this.state.spells.merge(newSummonerSpells)
    });

  }

  getSummonerSpells(lang) {
    return this.state.spells.get(lang);
  }

  getSummonerSpell(lang, spellId) {
    return this.state.spells.get(lang).get('data').get(spellId);
  }

}

export default SummonerSpellStore;

