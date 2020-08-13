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
  label,
  value,
  onChange,
  error,
  showErrorWhenNotFocused,
  formik = {},
  type = 'text',
  ...rest
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        label={label}
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        onBlur={!showErrorWhenNotFocused ? formik.handleBlur : () => {}}
        {...rest}
      />
      {renderError(showErrorWhenNotFocused, error, formik, name)}
    </div>
  )
}

Textarea.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  type: string,
  error: string,
  value: oneOfType([string, number, instanceOf(Date)]).isRequired,
  onChange: func.isRequired,
  formik: object,
  showErrorWhenNotFocused: bool
}

export default Textarea
