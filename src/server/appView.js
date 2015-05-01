import React from 'react';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import Router from 'react-router';
import routes from '../common/routes';
import Flux from '../common/Flux';
import FluxComponent from 'flummox/component';
import performRouteHandlerStaticMethod from '../common/utils/performRouteHandlerStaticMethod';

const templateFile = path.join(__dirname, '../common/templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

export default function*() {
  const flux = new Flux();
  const router = Router.create({
    routes: routes,
    location: this.url,
    onError: error => {
      throw error;
    },
    onAbort: abortReason => {
      const error = new Error();

      if (abortReason.constructor.name === 'Redirect') {
        const { to, params, query } = abortReason;
        const url = router.makePath(to, params, query);
        error.redirect = url;
      }

      throw error;
    }
  });


  let appString;
  
  try {
    const {Handler, state} = yield new Promise((resolve, reject) => {
      router.run((_Handler, _state) =>
        resolve({ Handler: _Handler, state: _state })
      );
    });

    const routeHandlerInfo = { state, flux };


    try {
      yield performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);
    } catch (e) {}

    appString = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>
    );
  } catch (error) {
    if (error.redirect) {
      return this.redirect(error.redirect);
    }

    throw error;
  }


  const data = {title: 'LTJ', body: appString};

  this.body = template(data);
}

