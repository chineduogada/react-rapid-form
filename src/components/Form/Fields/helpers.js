import React from 'react'

export const renderError = (showErrorWhenNotFocused, error, formik, name) => {
  if (!showErrorWhenNotFocused) {
    return (
      error &&
      formik.touched[name] && (
        <div className='form__error' data-test='error'>
          {error}
        </div>
      )
    )
  }
  return error && <div className='form__error'>{error}</div>
}

