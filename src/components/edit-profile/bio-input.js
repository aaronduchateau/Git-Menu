import React from 'react'
import PropTypes from 'prop-types'
import TextArea from '../others/input/textArea'

const InputBio = ({ value, change, placeholder = 'bio', maxLength = 1000, keyValue = 'bio', label='bio' }) => (
  <div className="edit_bio_div">
    <span className="edit_span">{label}</span>
    <TextArea
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      valueChange={e => change(keyValue, e)}
      className="edit_ta"
    />
  </div>
)

InputBio.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
}

export default InputBio
