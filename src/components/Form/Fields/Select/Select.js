import React from 'react'
import { renderError } from '../helpers'
import {
  string,
  func,
  oneOfType,
  number,
  object,
  bool,
  arrayOf,
  shape
} from 'prop-types'
function Select({
  name,
  label,
  value,
  onChange,
  error,
  showErrorWhenNotFocused,
  formik = {},
  options = [],
  ...rest
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        data-test='control'
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
      >
        <option data-test='option' value=''></option>

        {options.map(({ id, label }, index) => (
          <option value={id} key={index}>
            {label}
          </option>
        ))}
      </select>

      {renderError(showErrorWhenNotFocused, error, formik, name)}
    </div>
  )
}

Select.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  value: oneOfType([string, number]).isRequired,
  options: arrayOf(
    shape({
      id: oneOfType([string, number]).isRequired,
      label: oneOfType([string, number]).isRequired
    })
  ).isRequired,
  onChange: func.isRequired,
  formik: object,
  showErrorWhenNotFocused: bool,
  error: string
}

export default Select
