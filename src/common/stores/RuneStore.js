import { Store } from 'flummox';
import { Map } from 'immutable';

class RuneStore extends Store {
  constructor({ runeActions }) {
    super();

    this.register(runeActions.getRunes, this.handleRunes);

    this.state = {
      runes: new Map()
    };
  }

  handleRunes(newRunes) {

    this.setState({
      runes: this.state.runes.merge(newRunes)
    });

  }

  getRunes(lang) {
    return this.state.runes.get(lang);
  }

  getRune(lang, runeId) {
    return this.state.runes.get(lang).get('data').get(runeId);
  }

}

export default RuneStore;

