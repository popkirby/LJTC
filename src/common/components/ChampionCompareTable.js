import React from 'react';
import { Table } from 'react-bootstrap';
import { getDDragonUrl, infoString } from '../utils/ddragonUtils';
import { LOL_VERSION } from '../config';
import { generateRow } from '../utils/tableUtils';
import { contextTypes } from 'react-props-decorators';

@contextTypes({
  router: React.PropTypes.func
})
class ChampionCompareTable extends React.Component {

  _generateRow = (...args) => {
    return generateRow(this.context.router.getCurrentPath(), this.props.en.get('name'), ...args);
  }

  _tableContent = (header, key) => {
    const { ja, en } = this.props;
    return this._generateRow(header, ja.get(key), en.get(key), header, en.get('name'));
  }

  _getSkins = () => {
    const { ja, en } = this.props;
    const skins = en.get('skins');

    let rows = [];
    let num = 0;

    skins.forEach((v) => {
      rows.push(this._generateRow(`Skin ${num + 1}`, ja.get('skins').get(num).get('name'), v.get('name'), num));
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

    rows.push(this._generateRow('Passive', jaPassive.get('name'), enPassive.get('name'), 'passive'));

    rows.push(this._generateRow('', jaPassive.get('description'), enPassive.get('description'), 'passiveinfo', 'info'));


    const jaSpells = ja.get('spells');

    spells.forEach((v) => {
      rows.push(this._generateRow(`Spell ${num + 1}`, jaSpells.get(num).get('name'), v.get('name'), num));
      rows.push(this._generateRow('', jaSpells.get(num).get('description'), v.get('description'), num + 100, 'info'));
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
        <th></th>
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

