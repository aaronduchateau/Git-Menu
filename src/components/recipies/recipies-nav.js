import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'


const RecipiesNav = ({ url }) => {
  let commonProps = {
    activeClassName: 'exp_nav_active',
    className: 'exp_nav_link',
  }

  return (
    <Fragment>
      <ul>
        <li>
          <NavLink to={`${url}/add-recipie`} {...commonProps}>
            Add New Recipie
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}`} exact {...commonProps}>
            My Recipies
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/discover-recipies`} {...commonProps}>
            Discover Recipies
          </NavLink>
        </li>
      </ul>
    </Fragment>
  )
}

RecipiesNav.propTypes = {
  url: PropTypes.string.isRequired,
}

export default RecipiesNav
