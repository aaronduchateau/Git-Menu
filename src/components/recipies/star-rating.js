import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StarRating extends Component {

  state = {
    hoverStarValue: 0
  }

  onOver = (n) => {
    !this.props.viewOnly && this.setState({hoverStarValue: n});
  } 

  onOut = (n) => {
    !this.props.viewOnly && this.setState({hoverStarValue: 0});
  } 

  onStarRate = (n) => {
    !this.props.viewOnly && this.props.handleStarRate(n);
  } 

  getRateStyle = (n) => {
    if (this.state.hoverStarValue > 0){
      let beatClass = this.state.hoverStarValue === n ? " fa-beat" : "";
      return this.state.hoverStarValue >= n ? "fas fa-star" + beatClass: "far fa-star" + beatClass;
    } else {
      return this.props.starRating >= n ? "fas fa-star" : "far fa-star";
    }
  }
  

  render() {
    let {marginLeft = 0} = this.props;
    return (
      <span className={"recipie_stars_rating" + (this.props.viewOnly ? " view_only" : "")} 
        onMouseLeave={() => this.onOut()}
        style={{marginLeft: marginLeft + 'px'}}
        >
        <span onMouseEnter={() => this.onOver(1)} onClick={()=>{this.onStarRate(1)}}>
          <i className={this.getRateStyle(1)}></i >
        </span>
        <span onMouseEnter={() => this.onOver(2)} onClick={()=>{this.onStarRate(2)}}>
          <i className={this.getRateStyle(2)}></i>
        </span>
        <span onMouseEnter={() => this.onOver(3)} onClick={()=>{this.onStarRate(3)}}>
          <i className={this.getRateStyle(3)}></i>
        </span>
        <span onMouseEnter={() => this.onOver(4)} onClick={()=>{this.onStarRate(4)}}>
          <i className={this.getRateStyle(4)}></i>
        </span>
        <span onMouseEnter={() => this.onOver(5)} onClick={()=>{this.onStarRate(5)}}>
          <i className={this.getRateStyle(5)}></i>
        </span>
    </span>
    )
  }
}

StarRating.propTypes = {
  group: PropTypes.number,
}
