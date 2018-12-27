import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';
import { Loading } from "./components/Loading";
import Notification from './components/Notification';
import TasksPage from "./pages/TasksPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./containers/ProtectedRoute";
import * as actions  from './store/users/actions';
import { updateHeader } from "./providers/global.provider";

class App extends Component {

  onLogout = () => {
    this.props.dispatch(actions.logout());
  };

  componentWillMount() {
    const token = localStorage.getItem('token');

    if (token) {
      updateHeader(token);

      this.props.dispatch(actions.me());
    }
  }

  render() {
    const { app } = this.props;
    const { errors, user, loading } = app;

    return (
      <div className="App">
        <div className="main-wrap">
          <header className="header">
            {
              user ?
                <Fragment>
                  <div className="header__user">
                    {user.firstName} {user.lastName}
                  </div>
                  <button className="button" onClick={this.onLogout}>
                    <span>Logout</span>
                  </button>
                </Fragment>
                :
                <Fragment>
                  <div className="header__user">
                    Task management
                  </div>
                </Fragment>
            }
          </header>

          <BrowserRouter>
            <Switch>
              <ProtectedRoute exact path="/" component={TasksPage} guard={!app.auth.status} pending={app.auth.pending} fallback="/sign-in" />
              <ProtectedRoute path="/sign-in" component={SignInPage} guard={app.auth.status} pending={app.auth.pending} fallback="/"/>
              <ProtectedRoute path="/sign-up" component={SignUpPage} guard={app.auth.status} pending={app.auth.pending} fallback="/"/>
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>

          { loading && <Loading />}

          { errors.length ? <Notification errors={errors} /> : null}

        </div>
      </div>
    );
  }
}

const initMapStateToProps = (state) => {
  return state;
}

export default connect(initMapStateToProps)(App);
