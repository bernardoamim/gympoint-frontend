import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';
import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" isPrivate component={Students} />
    </Switch>
  );
}
