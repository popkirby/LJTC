import React from 'react';
import Flux from 'flummox/component';
import PanelItem from './PanelItem';
import { Grid, Row } from 'react-bootstrap';
import { contextTypes } from 'react-props-decorators';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';

@contextTypes({
  router: React.PropTypes.func
})
class SummonerSpellsHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const summonerSpellActions = flux.getActions('summonerSpells');
    const summonerSpellStore = flux.getStore('summonerSpells')

    if (!summonerSpellStore.getSummonerSpells('ja_JP'))
      return [await summonerSpellActions.getSummonerSpells('ja_JP'), await summonerSpellActions.getSummonerSpells('en_US')];
  }

  _createItem = (ja, en, spellId) => {
    const { router } = this.context;
    const href = router.makeHref('spell', { spellId });
    const imageUrl =  getDDragonUrl(`/cdn/${LOL_VERSION}/img/spell/${ja.get('image').get('full')}`);

    return (
      <PanelItem ja={ ja.get('name') } en={ en.get('name') } href={ href }
                 imageUrl={ imageUrl }
                 key={ spellId } />
    );
  }

  render() {
    return (
      <div>
        <Flux connectToStores={{
          summonerSpells: (store, props) => ({
            ja: store.getSummonerSpells('ja_JP').get('data'),
            en: store.getSummonerSpells('en_US').get('data')
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
            { ja.map((v, k) => ( this._createItem(v, en.get(k), k) )).toArray() }
            </Row>
          </Grid>
        )}
        />
      </div>
    );
  }

}

export default SummonerSpellsHandler;

