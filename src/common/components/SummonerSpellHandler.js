import React from 'react';
import { contextTypes } from 'react-props-decorators';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import Flux from 'flummox/component';
import SummonerSpellCompareTable from './SummonerSpellCompareTable';
import { Grid, Row, Button } from 'react-bootstrap';

@contextTypes({
  router: React.PropTypes.func
})
class SummonerSpellHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const summonerSpellActions = flux.getActions('summonerSpells');
    const summonerSpellStore = flux.getStore('summonerSpells');

    if (!summonerSpellStore.getSummonerSpells('ja_JP'))
      return [await summonerSpellActions.getSummonerSpells('ja_JP'), await summonerSpellActions.getSummonerSpells('en_US')];
  }


  render() {
    const { spellId } = this.props.params;

    return (
      <div>
        <Button bsStyle='link' onClick={this.context.router.goBack}> &lt; back </Button>
        <Flux connectToStores={{
          summonerSpells: (store, props) => ({
            ja: store.getSummonerSpell('ja_JP', spellId),
            en: store.getSummonerSpell('en_US', spellId)
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
              <SummonerSpellCompareTable ja={ja} en={en} />
            </Row>
          </Grid>
        )}
        />
      </div>
    
    );
  }
}

export default SummonerSpellHandler;

