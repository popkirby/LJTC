import React from 'react';
import { Table } from 'react-bootstrap';
import { getDDragonUrl, infoString } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import { generateRow } from '../utils/tableUtils';
import { contextTypes } from 'react-props-decorators';

@contextTypes({
  router: React.PropTypes.func
})
class ItemCompareTable extends React.Component {

  _generateRow = (...args) => {
    return generateRow(this.context.router.getCurrentPath(), this.props.en.get('name'), ...args);
  }

  _tableContent = (header, key) => {
    const { ja, en } = this.props;
    return this._generateRow(header, ja.get(key), en.get(key));
  }

  render() {
    const { ja, en } = this.props;

    const header = (
      <thead>
        <th>
          <img src={ getDDragonUrl(`/cdn/${LOL_VERSION}/img/item/${ja.get('image').get('full')}`) }
               className='img-rounded'
               width='50' height='50' />
        </th>
        <th>ja</th>
        <th>en</th>
        <th></th>
      </thead>
    );

    return (
      <div>
        <Table>
            { header }
          <tbody>
            { this._tableContent('Name', 'name') }
            { this._tableContent('Text', 'plaintext') }
          </tbody>
          <tbody>
            { this._tableContent('Desc', 'description') }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ItemCompareTable;

