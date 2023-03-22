import React from 'react';
import PropTypes from 'prop-types';

import wrapper from './store/configureStore';

const App = () => {
  return (
    <>
      <div>
        <title>Redux-saga</title>
      </div>
    </>
  );
};

Saga.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
};

export default wrapper.withRedux(App);
