import React from 'react'

export const renderError = (showErrorWhenNotFocused, error, formik, name) => {
  if (!showErrorWhenNotFocused) {
    return error && formik.touched[name] && <div data-test='error'>{error}</div>
  }
  return error && <div>{error}</div>
}

