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
class RunesHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const runeActions = flux.getActions('runes');
    const runeStore = flux.getStore('runes');
    
    if (!runeStore.getRunes('ja_JP'))
      return [await runeActions.getRunes('ja_JP'), await runeActions.getRunes('en_US')];
  }

  _createItem = (ja, en, runeId) => {
    const { router } = this.context;
    const href = router.makeHref('rune', { runeId });
    const imageUrl =  getDDragonUrl(`/cdn/${LOL_VERSION}/img/rune/${ja.get('image').get('full')}`);

    return (
      <PanelItem ja={ ja.get('name') } en={ en.get('name') } href={ href }
                 imageUrl={ imageUrl } runeId={ runeId }
                 key={ runeId } sm={6} />
    );
  }

  render() {
    return (
      <div>
        <Flux connectToStores={{
          runes: (store, props) => ({
            ja: store.getRunes('ja_JP').get('data'),
            en: store.getRunes('en_US').get('data')
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
            { ja.map((v, k) => ( this._createItem(v, en.get(k), k) )).toArray().sort((a, b) => (parseInt(a.props.runeId) - parseInt(b.props.runeId))) }
            </Row>
          </Grid>
        )}
        />
      </div>
    );
  }

}

export default RunesHandler;

