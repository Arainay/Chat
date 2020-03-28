import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '@app/components/Login';
import Chat from '@app/components/Chat';

const App = () => {
  return (
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/chat/:room/:name" component={Chat}/>
      <Redirect to="/login"/>
    </Switch>
  );
};

export default App;
