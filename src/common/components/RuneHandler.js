import React from 'react';
import { contextTypes } from 'react-props-decorators';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import Flux from 'flummox/component';
import RuneCompareTable from './RuneCompareTable';
import { Grid, Row, Button } from 'react-bootstrap';

@contextTypes({
  router: React.PropTypes.func
})
class RuneHandler extends React.Component {

  static async routerWillRun({ flux, state }) {
    const runeActions = flux.getActions('runes');
    const runeStore = flux.getStore('runes');

    if (!runeStore.getRunes('ja_JP'))
      return [await runeActions.getRunes('ja_JP'), await runeActions.getRunes('en_US')];
  }


  render() {
    const { runeId } = this.props.params;

    return (
      <div>
        <Button bsStyle='link' onClick={this.context.router.goBack}> &lt; back </Button>
        <Flux connectToStores={{
          runes: (store, props) => ({
            ja: store.getRune('ja_JP', runeId),
            en: store.getRune('en_US', runeId)
          })
        }}
        render={({ ja, en }) => (
          <Grid>
            <Row>
              <RuneCompareTable ja={ja} en={en} />
            </Row>
          </Grid>
        )}
        />
      </div>
    
    );
  }
}

export default RuneHandler;

