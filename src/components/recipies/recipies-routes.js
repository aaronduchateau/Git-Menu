import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { string } from 'prop-types'

import AddRecipie from './add-recipie/add-recipie'
import ViewRecipie from './view-recipie/view-recipie'

const RecipiesRoutes = ({ url }) => (
  <div className="exp_hmm">
    <Switch>
      <Route path={`${url}`} exact component={ViewRecipie} />
      <Route path={`${url}/add-recipe`} component={AddRecipie} />
      <Route path={`${url}/*`} exact component={ViewRecipie} />
      <Redirect to="/error" />
    </Switch>
  </div>
)

RecipiesRoutes.propTypes = {
  url: string.isRequired,
}

export default RecipiesRoutes
