import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getUsersToExplore } from '../../../actions/explore'
import Nothing from '../../others/nothing'
import PrimaryButton from '../../others/button/primary-btn'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'
import SecondHeader from '../second-header'
import Ingredient from '../ingredient'
import Direction from '../direction'
import BioInput from '../../edit-profile/bio-input'
import TextInput from '../../others/input/text'
import StarRating from'../star-rating'

const DescriptionPreviewText = "Ex: My mother was a good cook and a great baker; her desserts were so delicious that my father and my older brother wrote a song about them, to the tune of Dvorák's Humoresque. It began, 'You may think us quite disgusting / We eat though our belly's busting / Mother, pass another piece of pie.'";

class AddRecipie extends Component {
  state = {
    loading: true,
    title: '',
    description: '',
    starRating: 0,
    prepTime: {hrs: "", mins: ""},
    cookTime: {hrs: "", mins: ""},
    totalTime: {hrs: "", mins: ""},
  }

  componentDidMount = () => this.props.dispatch(getUsersToExplore())

  componentWillReceiveProps = () => this.setState({ loading: false })

  handleTitleClick = (e) => {
    e.preventDefault();
    alert("title click");
  }

  handleStarRate = (n) => {
    this.setState({starRating: n});
  }

  getEditLabel = () => {
    return (<span><i className="fas fa-pencil-alt"/></span>);
  }

  change = (what, e) => this.setState({ [what]: e.target.value });

  changeCookorPrepTime = (pc, hm, e) => {
    let whichCookTimeObject = Object.assign({}, this.state[pc]);
    whichCookTimeObject[hm] = e.target.value; 
    
    this.setState({[pc]: whichCookTimeObject}, () => {
      let baseHours = parseInt(this.state.prepTime.hrs || 0) + parseInt(this.state.cookTime.hrs || 0);
      let baseMins = parseInt(this.state.prepTime.mins || 0) + parseInt(this.state.cookTime.mins || 0);
      let hourMins = (baseHours * 60);
      let totalDecimalTime = ((hourMins + baseMins) / 60).toFixed(2);
      if (totalDecimalTime % 1 != 0){
        //has decimal value
        let splitArr = totalDecimalTime.toString().split(".");
        baseHours = parseInt(splitArr[0]);
        let minsDecimal = parseInt(splitArr[1]) / 100;
        baseMins = Math.round(minsDecimal * 60);
      } else {
        baseHours = totalDecimalTime;
        baseMins = 0;
      }
      this.setState({'totalTime': {'hrs': baseHours, 'mins': baseMins} });
    }); 
  }

  render() {
    let { users } = this.props,
      { loading, title, description, starRating, cookTime, prepTime, totalTime } = this.state;

    return (
      <div>
        <Title value="Add Recipie" />

        <FadeIn duration="300ms">
          <IsLoading loading={loading} />

          <div
            className={classNames('m_div', cLoading(loading))}
            style={{ marginTop: 0 }}
          >
            <div className="add_recipie_container">
              <div className="add_recipie_half_container edit_main">
                <div className="space5" />
                <div className="edit_un_div">
                  <span className="edit_span">Title</span>
                  <TextInput
                    type="text"
                    placeholder="A title for your recipie"
                    value={title}
                    valueChange={e => this.change('title', e)}
                    maxLength="100"
                  />
                </div>
                <div className="edit_un_div">
                  <span className="edit_span">Be the first to rate your recipie!</span>
                  <StarRating starRating={starRating} handleStarRate={this.handleStarRate}/>
                  
                </div>
                <div className="edit_un_div">
                  <div className="prep_cook_container">
                    <span className="edit_span">Prep Time:</span>
                    <TextInput
                      type="text"
                      placeholder="0"
                      value={prepTime.hrs}
                      valueChange={e => this.changeCookorPrepTime('prepTime','hrs', e)}
                      maxLength="2"
                    /> Hours &nbsp;
                    <TextInput
                      type="text"
                      placeholder="0"
                      value={prepTime.mins}
                      valueChange={e => this.changeCookorPrepTime('prepTime','mins', e)}
                      maxLength="2"
                    /> Mins 
                  </div>  
                  <div className="prep_cook_container">
                    <span className="edit_span">Cook Time:</span>
                    <TextInput
                      type="text"
                      placeholder="0"
                      value={cookTime.hrs}
                      valueChange={e => this.changeCookorPrepTime('cookTime','hrs', e)}
                      maxLength="2"
                    /> Hours &nbsp;
                    <TextInput
                      type="text"
                      placeholder="0"
                      value={cookTime.mins}
                      valueChange={e => this.changeCookorPrepTime('cookTime','mins', e)}
                      maxLength="2"
                    /> Mins 
                  </div>
                  <div className="clear" />
                </div>
                <BioInput 
                  value={description} 
                  change={this.change} 
                  maxLength="2000"
                  keyValue='description'
                  label='Description'
                  placeholder='The history, description, or conetext of your recipie!'
                />
              </div>
              <div className="add_recipie_half_container">
                <div className="white_tab">
                  Preview:
                </div>
                <div className="white_container">
                  <div className="space20" />
                  <div className="title_container_view">
                    <h3>{this.state.title || "Ex: Vegi Lasagna with Pesto"}</h3>
                  </div>
                  <div className="space10" />
                  <div className="holder">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                  </div>
                  <StarRating starRating={starRating} handleStarRate={this.handleStarRate} viewOnly={true} marginLeft="15"/>
                  <div className="space5" />
                  <div className="holder">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                  </div>

                  <div className="space25" />
                  <div className="float_time_holder">
                    <i className="far fa-clock"></i> Prep Time:<br/>
                    <h3> {prepTime.hrs || "0"} hr {prepTime.mins || "0"} min</h3>
                  </div>
                  <div className="float_time_seperator">
                    <h1>|</h1>
                  </div> 
                  <div className="float_time_holder">
                    <i className="far fa-clock"></i> Cook Time:<br/>
                    <h3> {cookTime.hrs || "0"} hr {cookTime.mins || "0"} min</h3>
                  </div>
                  <div className="float_time_seperator">
                    <h1>|</h1>
                  </div> 
                  <div className="float_time_holder">
                    <i className="far fa-clock"></i> Total Time:<br/>
                    <h3> {totalTime.hrs || "0"} hr {totalTime.mins || "0"} min</h3>
                  </div>
                  <div className="clear" />
                  <div className="space25" />

                  <div className="holder">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                  </div>
                  <div className="space10" />
                  <div className="description_container_view">
                    <span className="fancy_blockquote_holder">
                      <i className="fas fa-quote-left"></i>
                    </span>  
                    {this.state.description || DescriptionPreviewText}
                  </div>
                  <div className="clear" />
                  <div className="space25" />


                </div>  
              </div>
              <div className="clear" />



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

export default connect(mapStateToProps)(AddRecipie)
export { AddRecipie as PureAddRecipie }
