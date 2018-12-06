import React from 'react'

const SecondHeader = ({ stars, onClickRateStars, prep }) => {

  return (
    <span> 
      <span className="recipie_stars">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="far fa-star"></i>
      </span>
      &nbsp;
      &nbsp;
      &nbsp;
      <span className="cook_prep_holder">
        prep: 15 min. 
        &nbsp;<span className="cook_prep_holder_divide">|</span>
        &nbsp;cook 15 min.&nbsp;
        <span className="cook_prep_holder_divide">|</span>
        &nbsp;<i className="far fa-clock"></i>
        &nbsp;30 min.
      </span>  
    </span>
  )
}
export default SecondHeader
