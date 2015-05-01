import React from 'react';
import Header from './Header';
import { RouteHandler } from 'react-router';

class AppHandler extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}

export default AppHandler;

