import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { getUnreadNotifications } from '../../actions/notification'
import { getUnreadMessages } from '../../actions/message'
import RecipiesNav from './recipies-nav'
import RecipiesRoutes from './recipies-routes'

@connect()
export default class Recipies extends Component {
  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(getUnreadNotifications())
    dispatch(getUnreadMessages())
  }

  render() {
    let {
      match: { url },
    } = this.props

    return (
      <div className="recipies_ml">
        <FadeIn duration="300ms">
          <div className="exp_nav">
            <RecipiesNav url={url} />
          </div>

          <RecipiesRoutes url={url} />
        </FadeIn>
      </div>
    )
  }
}
