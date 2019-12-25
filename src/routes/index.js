import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';
import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import NewStudent from '~/pages/NewStudent';
import NewPlan from '~/pages/NewPlan';
import NewInscription from '~/pages/NewInscription';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" isPrivate component={Students} />
      <Route path="/newStudent" isPrivate component={NewStudent} />
      <Route path="/newPlan" isPrivate component={NewPlan} />
      <Route path="/newInscription" isPrivate component={NewInscription} />
    </Switch>
  );
}
