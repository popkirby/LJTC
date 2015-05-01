import React from 'react';
import { Table } from 'react-bootstrap';
import { getDDragonUrl, infoString } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';


class ChampionCompareTable extends React.Component {

  _tableContent = (header, key) => {
    const { ja, en } = this.props;
    return (
      <tr>
        <th>{ header }</th>
        <td>{ ja.get(key) }</td>
        <td>{ en.get(key) }</td>
      </tr>
    );
  }

  _getSkins = () => {
    const { ja, en } = this.props;
    const skins = en.get('skins');

    let rows = [];
    let num = 0;

    skins.forEach((v) => {
      rows.push(
        <tr key={num}>
          <th>Skin {num + 1}</th>
          <td>{ ja.get('skins').get(num).get('name') }</td>
          <td>{ v.get('name') }</td>
        </tr>
      );
      num += 1;
    });

    return rows;
  }

  _getSpells = () => {
    const { ja, en } = this.props;
    const spells = en.get('spells');

    const jaPassive = ja.get('passive');
    const enPassive = en.get('passive');

    let rows = [];
    let num = 0;

    rows.push(
      <tr key={'passive'}>
        <th>Passive</th>
        <td className='white-pre'>{ jaPassive.get('name') }</td>
        <td className='white-pre'>{ enPassive.get('name') }</td>
      </tr>
    );

    rows.push(
      <tr key={'passiveinfo'} className='info'>
        <th></th>
        <td className='white-pre'>{ infoString(jaPassive.get('description')) }</td>
        <td className='white-pre'>{ infoString(enPassive.get('description')) }</td>
      </tr>
    );


    const jaSpells = ja.get('spells');

    spells.forEach((v) => {
      rows.push(
        <tr key={num}>
          <th>Spell {num + 1}</th>
          <td>{ jaSpells.get(num).get('name') }</td>
          <td>{ v.get('name') }</td>
        </tr>
      );

      rows.push(
        <tr key={num + 100} className='info'>
          <th></th>
          <td className='white-pre'>{ infoString(jaSpells.get(num).get('description')) }</td>
          <td className='white-pre'>{ infoString(v.get('description')) }</td>
        </tr>
      );

      num += 1;
    });

    return rows;
 
  }

  render() {
    const { ja, en } = this.props;

    const header = (
      <thead>
        <th>
          <img src={ getDDragonUrl(`/cdn/${ LOL_VERSION }/img/champion/${ja.get('image').get('full')}`) }
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
            { this._tableContent('Title', 'title') }
          </tbody>
          <tbody>
            { this._getSpells() }
          </tbody>
          <tbody>
            { this._getSkins() }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ChampionCompareTable;

