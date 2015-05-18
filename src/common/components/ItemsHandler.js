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
class ItemsHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const itemActions = flux.getActions('items');
    const itemStore = flux.getStore('items');

    if (!itemStore.getItems('ja_JP'))
      return [await itemActions.getItems('ja_JP'), await itemActions.getItems('en_US')];
  }

  _createItem = (ja, en, itemId) => {
    const { router } = this.context;
    const href = router.makeHref('item', { itemId });
    const imageUrl =  getDDragonUrl(`/cdn/${LOL_VERSION}/img/item/${ja.get('image').get('full')}`);

    return (
      <PanelItem ja={ ja.get('name') } en={ en.get('name') } href={ href }
                 imageUrl={ imageUrl }
                 key={ itemId } />
    );
  }

  render() {
    return (
      <div>
        <Flux connectToStores={{
          items: (store, props) => ({
            ja: store.getItems('ja_JP').get('data'),
            en: store.getItems('en_US').get('data')
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

export default ItemsHandler;

