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

function Textarea({
  name,
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
    <div className='form__group'>
      <textarea
        name={name}
        label={label}
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        className='form__control form__textarea'
        onBlur={!showErrorWhenNotFocused ? formik.handleBlur : () => {}}
        {...rest}
      />

      {!hideErrorMessage &&
        renderError(showErrorWhenNotFocused, error, formik, name)}
    </div>
  )
}

Textarea.propTypes = {
  name: string.isRequired,
  type: string,
  error: string,
  value: oneOfType([string, number, instanceOf(Date)]).isRequired,
  onChange: func.isRequired,
  formik: object,
  showErrorWhenNotFocused: bool,
  hideErrorMessage: bool
}

export default Textarea
