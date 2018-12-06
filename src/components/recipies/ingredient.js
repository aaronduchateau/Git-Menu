import React from 'react'

const Ingredient = ({ isActiveEdit, ingredient, onEditClick, onAddBelowClick, isLast }) => {

  return (
    <div> 
      <div className="space5" />
      <span className="ingredient"><i className="fas fa-plus-circle"></i> 3/4 pound lean ground beef</span>
      <div className="space10" />
      {!isLast && 
      <div className="holder">
        <div className="line line1"></div>
        <div className="line line2"></div>
      </div>}
    </div>
  )
}
export default Ingredient
