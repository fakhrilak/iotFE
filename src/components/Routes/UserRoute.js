import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({
  component: Component,
  auth: { isLogin,loading,users },
  ...rest
}) => {
  console.log(isLogin,"ini di route")
  return (
    <Route
    {...rest}
    render={(props) =>
      isLogin? (
        <Component {...props} />
      ): isLogin == null ? (
        <Component {...props} />
      ):isLogin == false ?
      ( <Redirect to={{
        pathname: '/'}}
      />):null}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.login,
});

export default connect(mapStateToProps, {})(UserRoute);