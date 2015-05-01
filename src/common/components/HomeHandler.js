import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { LOL_VERSION } from '../config';

class HomeHandler extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>LJTC</h1><h2>LoL Japanese Transration Comparer</h2>
        </Jumbotron>
          <p><a href='https://developer.riotgames.com/docs/static-data'>LoL Static Data API</a>から
          取得した情報を元に、チャンピオン・アイテムの英語・日本語の比較を表示するサイトです。
          </p>
        <p>比較する情報を取得しているバージョンは { LOL_VERSION } のものです。</p>
        <p>ソースコードはこちらで公開されています: <a href='https://github.com/popkirby/LJTC/'>github</a></p>
        <p>不具合報告はgithub または <a href='https://twitter.com/popkirby'>@popkirby</a>まで</p>
      </div>
    );
  }
}

export default HomeHandler;
