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
  className,
  placeholder,
  value,
  onChange,
  error,
  showErrorWhenNotFocused,
  hideErrorMessage,
  formik = {},
  options = [],
  ...rest
}) {
  return (
    <div className={`form__group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <select
        data-test='control'
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        className='form__control form__select'
        {...rest}
      >
        <option data-test='option' value=''>
          {placeholder}
        </option>

        {options.map(({ values, placeholder }, index) => (
          <option value={values} key={index}>
            {placeholder}
          </option>
        ))}
      </select>

      {!hideErrorMessage &&
        renderError(showErrorWhenNotFocused, error, formik, name)}
    </div>
  )
}

Select.propTypes = {
  name: string.isRequired,
  label: string,
  className: string,
  placeholder: string,
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
  hideErrorMessage: bool,
  error: string
}

export default Select
