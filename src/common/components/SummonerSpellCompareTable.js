import React from 'react';
import { Table } from 'react-bootstrap';
import { getDDragonUrl, infoString } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';


class SummonerSpellCompareTable extends React.Component {

  _tableContent = (header, key) => {
    const { ja, en } = this.props;
    return (
      <tr>
        <th>{ header }</th>
        <td className='white-pre'>{ infoString(ja.get(key)) }</td>
        <td className='white-pre'>{ infoString(en.get(key)) }</td>
      </tr>
    );
  }
  render() {
    const { ja, en } = this.props;

    const header = (
      <thead>
        <th>
          <img src={ getDDragonUrl(`/cdn/${LOL_VERSION}/img/spell/${ja.get('image').get('full')}`) }
               className='img-rounded'
               width='50' height='50' />
        </th>
        <th>ja</th>
        <th>en</th>
      </thead>
    );

    return (
      <div>
        <Table>
            { header }
          <tbody>
            { this._tableContent('Name', 'name') }
          </tbody>
          <tbody>
            { this._tableContent('Desc', 'description') }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SummonerSpellCompareTable;

