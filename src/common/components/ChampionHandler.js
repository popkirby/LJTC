import React from 'react';
import { contextTypes } from 'react-props-decorators';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import Flux from 'flummox/component';
import ChampionCompareTable from './ChampionCompareTable';
import { Grid, Row, Button } from 'react-bootstrap';

@contextTypes({
  router: React.PropTypes.func
})
class ChampionHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const { name } = state.params;
    const championActions = flux.getActions('champions');

    return [await championActions.getChampion('ja_JP', name), await championActions.getChampion('en_US', name)];
  }

  render() {
    const { name } = this.props.params;

    return (
      <div>
        <Button bsStyle='link' onClick={this.context.router.goBack}> &lt; back </Button>
        <Flux connectToStores={{
          champions: (store, props) => ({
            ja: store.getChampion('ja_JP', name).get('data').get(name),
            en: store.getChampion('en_US', name).get('data').get(name)
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
              <ChampionCompareTable ja={ja} en={en} />
            </Row>
          </Grid>
        )}
        />
      </div>
    
    );
  }
}

export default ChampionHandler;

