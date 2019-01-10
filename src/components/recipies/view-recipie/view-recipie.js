import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getRecipe } from '../../../actions/recipe'
import Nothing from '../../others/nothing'
import PrimaryButton from '../../others/button/primary-btn'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'
import SecondHeader from '../second-header'
import Ingredient from '../ingredient'
import Direction from '../direction'
import {withRouter} from 'react-router-dom';

class ViewRecipie extends Component {
  state = {
    loading: true,
  }

  componentDidMount = () => {
    this.props.dispatch(getRecipe(this.props.location.pathname.split("/")[2]));
  }

  componentWillReceiveProps = () => this.setState({ loading: false })

  render() {
    let { users } = this.props,
      { loading } = this.state;

    return (
      <div>
        <Title value="Add Recipie" />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('m_div', cLoading(loading))}
            style={{ marginTop: 0 }}
          >
            <div className="recipie_container">
              <h2>
                Italian Risotto with Broccoli and Chedeer
              </h2>
              <img src="/images/lasagna.jpg" className="recipie_img"/>
              <div className="space5" />
              
              <hr className="subtle-hr" />
              <div className="space5" />
              <SecondHeader />
              <div className="space5" />
              <hr className="subtle-hr" />
            
              <p className="description_p">
                Risotto takes a while to cook properly, and it requires your attention as well as your time. For upwards of 20 minutes, you have one job and one job only, and that is to stir the rice while adding hot stock -a ladleful at a time- and cook the rice slowly so that the stock is absorbed. 
                <br/><br/>This technique called the risotto method, releases the rice's starches, producing a creamy, velvety dish, and it takes two hands. One for stirring and one for ladling. So it's best not to try to multitask while you're doing it. You could probably carry on a conversation, but don't try to do any other kitchen or prep work — especially if you're new to making risotto.
                <br/><br/>What's interesting about the risotto method is that it's so time -and labor- intensive that restaurants can't use it. It would take too long to make, and patrons don't like waiting half an hour for their food. like waiting half an hour for their food.like waiting half an hour for their food. What this means is that if you've only ever had risotto at a restaurant, you've never had a true risotto.
                <br/><br/>This technique called the risotto method, releases the rice's starches, producing a creamy, velvety dish, and it takes two hands. One for stirring and one for ladling. So it's best not to try to multitask while you're doing it. You could probably carry on a conversation, but don't try to do any other kitchen or prep work — especially if you're new to making risotto.
              </p>
              
              <hr className="subtle-hr" />
              <div className="space10" />
              <h3>Ingredients:</h3>

              <div className="space15" />
              <Ingredient />
              <Ingredient />
              <Ingredient isLast={true}/>
              <div className="space10" />
              <hr className="subtle-hr" />
              <div className="space10" />

              <h3>Directions:</h3>

              <div className="space15" />
              <Direction />
              <Direction />
              <Direction isLast={true}/>
              <div className="space10" />
              
              <hr className="subtle-hr" />
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  users: store.Explore.users,
})

export default connect(mapStateToProps)(withRouter(ViewRecipie))
export { ViewRecipie as PureViewRecipie }
