import React from 'react'
import {
  string,
  func,
  oneOfType,
  number,
  instanceOf,
  object,
  bool
} from 'prop-types'
import { renderError } from '../helpers'

function Input({
  name,
  label,
  className,
  value,
  onChange,
  error,
  showErrorWhenNotFocused,
  hideErrorMessage,
  formik = {},
  type = 'text',
  ...rest
}) {
  return (
    <div className={`form__group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        onBlur={!showErrorWhenNotFocused ? formik.handleBlur : () => {}}
        className='form__control form__input'
        {...rest}
      />

      {!hideErrorMessage &&
        renderError(showErrorWhenNotFocused, error, formik, name)}
    </div>
  )
}

Input.propTypes = {
  name: string.isRequired,
  label: string,
  className: string,
  type: string,
  error: string,
  value: oneOfType([string, number, instanceOf(Date)]).isRequired,
  onChange: func.isRequired,
  formik: object,
  showErrorWhenNotFocused: bool,
  hideErrorMessage: bool
}

export default Input
