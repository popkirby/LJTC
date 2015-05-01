import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import ChampionsHandler from './components/ChampionsHandler';
import ChampionHandler from './components/ChampionHandler';
import ItemsHandler from './components/ItemsHandler';
import ItemHandler from './components/ItemHandler';

const routes = (
  <Route path='/' handler={AppHandler}>
    <DefaultRoute handler={HomeHandler} />
    <Route name='champions' handler={ChampionsHandler} />
    <Route name='champion' path='/champion/:name' handler={ChampionHandler} />
    <Route name='items' handler={ItemsHandler} />
    <Route name='item' path='/item/:itemId' handler={ItemHandler} />
  </Route>
);

export default routes;

