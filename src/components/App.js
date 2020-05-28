import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import firebase, { FirebaseContext } from '../firebase';
import CreateLink from './Link/CreateLink';
import SearchLinks from './Link/SearchLinks';
import LinkList from './Link/LinkList';
import LinkDetail from './Link/LinkDetail';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import useAuth from './Auth/useAuth';
import Header from './Header';


function App() {
  const user = useAuth();

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{user, firebase}}>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/new/1" />} />
          <Route path="/create" component={CreateLink} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/search" component={SearchLinks} />
          <Route path="/top" component={LinkList} />
          <Route path="/new/:page" component={LinkList} />
          <Route path="/link/:linkId" component={LinkDetail} />
        </Switch>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
