import React from 'react'

const Direction = ({ isActiveEdit, direction, onEditClick, onAddBelowClick, isLast }) => {

  return (
    <div> 
      <div className="space5" />
      <span className="ingredient">
        <span className="fa-stack">
            <span className="fas fa-circle-notch fa-stack-2x"></span>
            <strong className="fas fa-stack-1x">
                1    
            </strong>
        </span>
        &nbsp; 1 pound sweet Italian sausage
      </span>
      <div className="space10" />
      {!isLast && <div className="holder">
        <div className="line line1"></div>
        <div className="line line2"></div>
      </div>}
    </div>
  )
}
export default Direction
