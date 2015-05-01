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
    let { xs, sm } = this.props;
    if (typeof xs === 'undefined') xs = 6;
    if (typeof sm === 'undefined') sm = 4;

    return (
      <Col xs={xs} sm={sm} className='col-xs-height col-full-height'>
        <Panel className='clickable-item' onClick={this._handleClick}>
          <div className='center-block text-center'>
            <img src={ imageUrl }
            className='img-rounded'
            width='48' height='48' />
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

