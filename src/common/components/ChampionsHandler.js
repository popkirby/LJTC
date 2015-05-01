import React from 'react';
import Flux from 'flummox/component';
import PanelItem from './PanelItem';
import { Grid, Row } from 'react-bootstrap';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import { contextTypes } from 'react-props-decorators';

@contextTypes({
  router: React.PropTypes.func
})
class ChampionsHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const championActions = flux.getActions('champions');

    return [await championActions.getChampions('ja_JP'), await championActions.getChampions('en_US')];
  }

  _createItem = (ja, en, name) => {
    const { router } = this.context;
    const href = router.makeHref('champion', { name });
    const imageUrl = getDDragonUrl(`/cdn/${ja.get('version')}/img/champion/${ja.get('image').get('full')}`);

    return (
      <PanelItem ja={ ja.get('name') } en={ en.get('name') } href={ href }
                 imageUrl={ imageUrl }
                 key={ name } />
    );
  }

  render() {
    return (
      <div>
        <Flux connectToStores={{
          champions: (store, props) => ({
            ja: store.getChampions('ja_JP').get('data'),
            en: store.getChampions('en_US').get('data')
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

export default ChampionsHandler;

