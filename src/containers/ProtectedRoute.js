import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const {component: Component, fallback, guard, pending, ...rest} = props;

  return (
    <Route {...rest} render={(props) => {
      return guard ?
        pending ?
          <div>Loading ...</div> :
          <Redirect to={fallback}/> :
        <Component {...props} />;
    }}/>
  );
};

ProtectedRoute.propTypes = {
  fallback: PropTypes.string.isRequired,
  guard: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  pending: PropTypes.bool
};

export default ProtectedRoute;
