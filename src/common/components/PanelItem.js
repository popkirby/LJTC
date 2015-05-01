import React from 'react';
import { Col, Table, Panel } from 'react-bootstrap';
import { getDDragonUrl } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config.js';
import { contextTypes } from 'react-props-decorators';

@contextTypes({
  router: React.PropTypes.func
})
class PanelItem extends React.Component {

  _handleClick = () => {
    const { href } = this.props;
    const { router } = this.context;
    router.transitionTo(href);
  }

  render() {
    const { ja, en, imageUrl } = this.props;

    return (
      <Col xs={6} sm={4}>
      <Panel className='clickable-item' onClick={this._handleClick}>
          <div className='center-block text-center'>
            <img src={ imageUrl }
            className='img-rounded'
            width='25%' height='25%' />
          </div>
          <div className='text-center'>
            { ja }<br />{ en }
          </div>
        </Panel>
      </Col>
    ); 
  }
  
}

export default PanelItem;

