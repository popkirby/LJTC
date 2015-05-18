import 'babel/polyfill';
import 'isomorphic-fetch';

import React from 'react';
import Router from 'react-router';
import routes from '../common/routes';
import Flux from '../common/Flux'
import performRouteHandlerStaticMethod from '../common/utils/performRouteHandlerStaticMethod';
import FluxComponent from 'flummox/component';

import debug from 'debug';

window.React = React;
window.myDebug = debug;

const flux = new Flux();

Router.run(routes, Router.HistoryLocation, async (Handler, state) => {
  const routeHandlerInfo = { state, flux };

  await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);

  React.render(
    <FluxComponent flux={flux}>
      <Handler {...state} />
    </FluxComponent>,
    document.getElementById('container')
  );
});

