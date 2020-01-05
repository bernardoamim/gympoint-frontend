import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import Plans from '~/pages/Plans';
import Inscriptions from '~/pages/Inscriptions';

import NewStudent from '~/pages/NewStudent';
import NewPlan from '~/pages/NewPlan';
import NewInscription from '~/pages/NewInscription';

import EditStudent from '~/pages/EditStudent';
import EditPlan from '~/pages/EditPlan';
import EditInscription from '~/pages/EditInscription';
import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" isPrivate component={Students} />
      <Route path="/plans" isPrivate component={Plans} />
      <Route path="/inscriptions" isPrivate component={Inscriptions} />
      <Route path="/help-orders" isPrivate component={HelpOrders} />

      {/* Creation Routes */}
      <Route path="/newStudent" isPrivate component={NewStudent} />
      <Route path="/newPlan" isPrivate component={NewPlan} />
      <Route path="/newInscription" isPrivate component={NewInscription} />

      {/* Edition Routes */}
      <Route path="/editStudent/:id" isPrivate component={EditStudent} />
      <Route path="/editPlan/:id" isPrivate component={EditPlan} />
      <Route
        path="/editInscription/:id"
        isPrivate
        component={EditInscription}
      />
    </Switch>
  );
}
