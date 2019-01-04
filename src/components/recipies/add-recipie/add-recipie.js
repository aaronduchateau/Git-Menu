import React, { Component } from 'react'
import { FadeIn, ExpanseDown } from 'animate-components'
import Title from '../../others/title'
import { connect } from 'react-redux'
import { getUsersToExplore } from '../../../actions/explore'
import Nothing from '../../others/nothing'
import PrimaryButton from '../../others/button/primary-btn'
import SecondaryButton from '../../others/button/secondary-btn'
import MaterialIcon from '../../others/icons/material-icon'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import classNames from 'classnames'
import SecondHeader from '../second-header'
import Ingredient from '../ingredient'
import Direction from '../direction'
import BioInput from '../../edit-profile/bio-input'
import TextInput from '../../others/input/text'
import StarRating from'../star-rating'
import TextArea from '../../others/input/textArea'
import { addRecipe } from '../../../utils/recipe-interact-utils'

const DescriptionPreviewText = "Ex: My mother was a good cook and a great baker; her desserts were so delicious that my father and my older brother wrote a song about them, to the tune of Dvorák's Humoresque. It began, 'You may think us quite disgusting / We eat though our belly's busting / Mother, pass another piece of pie.'";

const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class AddRecipie extends Component {
  state = {
    loading: true,
    key: guid(),
    title: '',
    description: '',
    starRating: 0,
    prepTime: {hrs: "", mins: ""},
    cookTime: {hrs: "", mins: ""},
    totalTime: {hrs: "", mins: ""},
    ingredients: [
      {val: '', previewText: "Ex: 2 cups cubed cooked chicken", key: guid()},
      {val: '', previewText: "Ex: 1 cup sour cream", key: guid()},
      {val: '', previewText: "Ex: 1 pinch ground black pepper", key: guid()},
    ],
    directions: [
      {val: '', previewText: "Ex: Place the onion, chili beans, black beans, corn, tomato sauce, beer, and diced tomatoes in a slow cooker. Add taco seasoning, and stir to blend. Lay chicken breasts on top of the mixture, pressing down slightly until just covered by the other ingredients. Set slow cooker for low heat, cover, and cook for 5 hours.", key: guid()},
      {val: '', previewText: "Ex: Add taco seasoning, and stir to blend.", key: guid()},
      {val: '', previewText: "Ex: Stir the shredded chicken back into the soup, and continue cooking for 2 hours", key: guid()},
    ],
    fadeOutKey: ''
  }

  componentDidMount = () => {
    this.props.dispatch(getUsersToExplore());
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = ()=> {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
      if (window.scrollY > 65){
        if(!this.state.hasScrolled){
          this.setState({hasScrolled: true});
        }
      } else {
        if(this.state.hasScrolled){
          this.setState({hasScrolled: false});
        }
      }
  }

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

  getAddLabel = () => {
    return (<span><i className="fas fa-plus"/> ingredient below </span>);
  }

  getCancelLabel = () => {
    return (<span><i className="fas fa-times"/> remove ingredient </span>);
  }

  change = (what, e) => this.setState({ [what]: e.target.value });

  listChange = (what, index, e) => {
    let editItem = this.state[what];
    let editItemCopy = editItem.slice(0);
    let editItemIndex = editItemCopy[index];
    editItemIndex.val = e.target.value;
    this.setState({ [what]: editItemCopy });
  }

  listAddNew = (what, index, e) => {
    let editItem = this.state[what];
    let editItemCopy = editItem.slice(0);
    let previewText = (what === 'ingredients') ? "Ex: Your next yummy ingredient..." : "Ex: Clear instructions on this step!...";
    
    editItemCopy.splice(index, 0, {val: '', previewText: previewText, key: guid()});
    this.setState({ [what]: editItemCopy });
  }

  listRemoveItem = (what, index, key) => {
    let editItem = this.state[what];
    if (editItem.length === 1) {
      alert('You must have at least one ingredient');
      return;
    }

    let editItemCopy = editItem.slice(0);
    editItemCopy.splice(index, 1);

    this.setState({fadeOutKey: key},()=>{
      setTimeout(()=>{
        this.setState({ [what]: editItemCopy });
      }, 400);
    });
  }

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
        baseHours = parseInt(totalDecimalTime);
        baseMins = 0;
      }
      this.setState({'totalTime': {'hrs': baseHours, 'mins': baseMins} });
    }); 
  }

  addRecipeLocal = (e) => {
    e.preventDefault();
    addRecipe(this.state);
  }

  stepProgressInd = (num) => {
    switch(num) {
      case 1:
        return Boolean(this.state.title.length > 5);
        break;
      case 2:
        return Boolean(this.state.prepTime.hrs && this.state.prepTime.mins && this.state.cookTime.hrs && this.state.cookTime.mins);
        break;
      case 3:
        return Boolean(this.state.description.length > 1);
      case 4:
        var found = false;
        for(var i = 0; i < this.state.ingredients.length; i++) {
            if (this.state.ingredients[i].val.length > 3) {
                found = true;
                break;
            }
        }
        return found;
      case 5:
        var found = false;
        for(var i = 0; i < this.state.directions.length; i++) {
            if (this.state.directions[i].val.length > 3) {
                found = true;
                break;
            }
        }
        return found;
      default:
        return false;
    }
  }

  render() {
    let { users } = this.props,
      { loading, title, description, starRating, cookTime, prepTime, totalTime, fadeOutKey, hasScrolled } = this.state;
      console.log('test');
      console.log(Array.isArray(this.state.ingredients));

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
              <div class="version_header">
                You are creating recipe <b>v1.0</b>&nbsp;
               <PrimaryButton
                label="Learn More"
                extraClass="version_but_info"
                />
              </div>  
              {hasScrolled && <div className="progress_spacer_left" />}


              <div className={'progress_footer ' + (hasScrolled ? 'progress_footer_scrolled' : '')}>  
                <div className="exp_nav">
                  <ul>
                    <li>
                      <a className={'exp_nav_link' + (this.stepProgressInd(1) ? ' exp_nav_active' : '')} aria-current="false" href="/recipies/add-recipie">
                        1. Title
                      </a>
                    </li>
                    <li>
                      <a className={'exp_nav_link' + (this.stepProgressInd(2) ? ' exp_nav_active' : '')} aria-current="false" href="/recipies">
                        2. Cook & Prep 
                      </a>
                    </li>
                    <li>
                      <a className={'exp_nav_link' + (this.stepProgressInd(3) ? ' exp_nav_active' : '')}aria-current="false" href="/recipies/discover-recipies">
                        3. Description
                      </a>
                    </li>
                     <li>
                      <a className={'exp_nav_link' + (this.stepProgressInd(4) ? ' exp_nav_active' : '')} aria-current="false" href="/recipies/discover-recipies">
                        4. Ingredients
                      </a>
                    </li>
                     <li>
                      <a className={'exp_nav_link' + (this.stepProgressInd(5) ? ' exp_nav_active' : '')} aria-current="false" href="/recipies/discover-recipies">
                        5. Directions
                      </a>
                    </li>
                    <li>
                      <PrimaryButton
                        label="Publish This Recipe"
                        extraClass="publish_but"
                        onClick={this.addRecipeLocal} 
                      />
                    </li>
                  </ul>
                </div>
              </div>  

              <div className="add_recipie_half_container edit_main">
                <div className="space5" />
                <div className="edit_un_div">
                  <TextInput
                    type="text"
                    placeholder="A title for your recipe..."
                    value={title}
                    valueChange={e => this.change('title', e)}
                    maxLength="100"
                  />
                </div>
                <div className="edit_un_div">
                  <div className="space15" />
                  <span className="starHolderExternal" tooltip='Be the first to rate your recipe!' tooltip-position='right' >
                    <StarRating starRating={starRating} handleStarRate={this.handleStarRate}/>
                  </span>
                </div>
                <div className="edit_un_div">
                  <div className="prep_cook_container" tooltip='Prep Time' tooltip-position='left' tooltip-small='true'>
                    <img className="prep_icon_tip" src="/images/chop.png" />
                    <TextInput
                      type="text"
                      placeholder="Hr"
                      value={prepTime.hrs}
                      valueChange={e => this.changeCookorPrepTime('prepTime','hrs', e)}
                      maxLength="2"
                      style={{textAlign:'right'}}
                    /> <span style={{marginRight:'3px'}}>:</span> 
                    <TextInput
                      type="text"
                      placeholder="Mn"
                      value={prepTime.mins}
                      valueChange={e => this.changeCookorPrepTime('prepTime','mins', e)}
                      maxLength="2"
                    />  
                  </div>  
                  <div className="prep_cook_container" tooltip='Cook Time' tooltip-position='left' tooltip-small='true'>
                    <img className="prep_icon_tip cook_icon_tip" src="/images/cooking.png" tooltip='Prep Time' tooltip-position='left' tooltip-small='true' />
                    <TextInput
                      type="text"
                      placeholder="Hr"
                      value={cookTime.hrs}
                      valueChange={e => this.changeCookorPrepTime('cookTime','hrs', e)}
                      maxLength="2"
                      style={{textAlign:'right'}}
                    /> <span style={{marginRight:'3px'}}>:</span>
                    <TextInput
                      type="text"
                      placeholder="Mn"
                      value={cookTime.mins}
                      valueChange={e => this.changeCookorPrepTime('cookTime','mins', e)}
                      maxLength="2"
                    />  
                  </div>
                  <div className="clear" />
                </div>
                <BioInput 
                  value={description} 
                  change={this.change} 
                  maxLength="2000"
                  keyValue='description'
                  label='&nbsp;'
                  placeholder='A short description of your recipe...'
                />
              </div>

              <div className={'add_recipie_half_container ' + (hasScrolled ? 'add_photo_holder' : 'add_photo_pre_scroll')}>
                <div className="white_container">
                  <div className="choose_img_holder">
                    <div className="space50" />
                    <h3>Add a picture of your recipe</h3>
                    <div className="space50" />
                    <PrimaryButton
                      label="Choose an Image"
                      extraClass="choose_img_btn"
                      onClick={this.addRecipeLocal} 
                    />
                    <div className="space50" />
                  </div>
                </div>  
              </div>
              <div className="clear" />



               <div className="add_recipie_half_container edit_main">
                <div className="space5" />
                <h3>Ingredients:</h3>
                <div className="edit_un_div">
                {this.state.ingredients.map((item, i) => {
                  return (
                  <div key={item.key} className="ing_parent_cont">
                    <div className={item.key === fadeOutKey ? 'ing_fade_out' : ''}>
                    <ExpanseDown duration="200ms">
                      <span className="edit_span">&nbsp;</span>
                      <TextInput
                        type="text"
                        placeholder={i === 0 ? 'Your first ingredient...' : 'Ingredient ' + (i + 1) +'...'}
                        value={item.val}
                        valueChange={e => this.listChange('ingredients', i, e)}
                        maxLength="100"
                      />
                      <div className="p_do">
                        <div className="">
                          <span
                            tooltip='Add below' tooltip-position='left' tooltip-icon='true'
                            className=""
                            data-tip="Add"
                            onClick={e => this.listAddNew('ingredients', (i + 1), e)}
                          >
                            <MaterialIcon icon="add" />
                          </span>
                        </div>
                        <div className="">
                          <span
                            tooltip='Remove' tooltip-position='buttom' tooltip-icon='true'
                            style={item.key === fadeOutKey ? {color: 'red'} : {}}
                            className=""
                            data-tip="Remove"
                            onClick={e => this.listRemoveItem('ingredients', i, item.key)}
                          >
                            <MaterialIcon icon="delete_forever" />
                          </span>
                        </div>
                      </div>
                      <div className="clear" />
                    </ExpanseDown>
                    </div>
                  </div>
                  );
                })}
                </div>
              </div>

              
              <div className="clear" />


              <div className="add_recipie_half_container edit_main">
                <div className="space5" />
                <h3>Cooking Instructions:</h3>
                <div className="edit_un_div">
                {this.state.directions.map((item, i) => {
                  return (
                  <div key={item.key} className="ing_parent_cont ing_desc_cont">
                    <div className={item.key === fadeOutKey ? 'ing_fade_out' : ''}>
                    <ExpanseDown duration="200ms">
                      <span className="edit_span">&nbsp;</span>
                      <TextArea
                        placeholder={i === 0 ? 'Your first Step...' : 'Step ' + (i + 1) +'...'}
                        value={item.val}
                        valueChange={e => this.listChange('directions', i, e)}
                        maxLength="2000"
                        className="edit_directions_textarea"
                      />
                      <div className="p_do">
                        <div className="">
                          <span
                            tooltip='Add below' tooltip-position='left' tooltip-icon='true'
                            className=""
                            data-tip="Add"
                            onClick={e => this.listAddNew('directions', (i + 1), e)}
                          >
                            <MaterialIcon icon="add" />
                          </span>
                        </div>
                        <div className="">
                          <span
                            tooltip='Remove' tooltip-position='buttom' tooltip-icon='true'
                            style={item.key === fadeOutKey ? {color: 'red'} : {}}
                            className=""
                            data-tip="Remove"
                            onClick={e => this.listRemoveItem('directions', i, item.key)}
                          >
                            <MaterialIcon icon="delete_forever" />
                          </span>
                        </div>
                      </div>
                      <div className="clear" />
                    </ExpanseDown>
                    </div>
                  </div>
                  );
                })}
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
