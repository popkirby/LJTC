import React from 'react';
import { contextTypes } from 'react-props-decorators';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import Flux from 'flummox/component';
import ItemCompareTable from './ItemCompareTable';
import { Grid, Row, Button } from 'react-bootstrap';

@contextTypes({
  router: React.PropTypes.func
})
class ItemHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const itemActions = flux.getActions('items');

    return [await itemActions.getItems('ja_JP'), await itemActions.getItems('en_US')];
  }


  render() {
    const { itemId } = this.props.params;

    return (
      <div>
        <Button bsStyle='link' onClick={this.context.router.goBack}> &lt; back </Button>
        <Flux connectToStores={{
          items: (store, props) => ({
            ja: store.getItem('ja_JP', itemId),
            en: store.getItem('en_US', itemId)
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
              <ItemCompareTable ja={ja} en={en} />
            </Row>
          </Grid>
        )}
        />
      </div>
    
    );
  }
}

export default ItemHandler;

