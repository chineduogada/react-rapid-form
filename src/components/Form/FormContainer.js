import React, { Fragment } from 'react'
import { useFormik } from 'formik'
import { object, func } from 'prop-types'
import { Input, Select } from './Fields'

function FormContainer({ initialValues, onSubmit, validationSchema, render }) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  /**
   * renderInput - renders an input element
   * @function
   * @param {{ name: string, label: string }} props - the props for the input. add any addition <input> attrs if necessary. eg: `placeholder`
   */
  const renderInput = (props = {}) => {
    const {
      name,
      label,
      onChange,
      showErrorWhenNotFocused = false,
      ...rest
    } = props

    const fieldProps = {
      showErrorWhenNotFocused,
      formik,
      name,
      label,

      error: formik.errors[name],
      value: formik.values[name],

      onChange: (e) => {
        formik.handleChange(e)
        if (onChange) onChange(e)
      },

      ...rest
    }

    return <Input {...fieldProps} />
  }

  /**
   * renderSelect - renders an select element
   * @function
   * @param {{ name: string, label: string, options: [{ id: string|number, label: string }] }} props - the props for the select. add any addition <select> attrs if necessary. eg: `placeholder`
   */
  const renderSelect = (props = {}) => {
    const {
      name,
      label,
      options,
      onChange,
      showErrorWhenNotFocused = false,
      ...rest
    } = props

    const fieldProps = {
      showErrorWhenNotFocused,
      formik,
      options,
      label,
      name,

      value: formik.values[name],
      error: formik.errors[name],

      onChange: (e) => {
        formik.handleChange(e)
        if (onChange) onChange(e)
      },

      ...rest
    }

    return <Select {...fieldProps} />
  }

  /**
   * renderBtn - renders an `ordinary` button element
   * @function
   * @param {{ label: string }} props - the props for the button. add any addition <button> attrs if necessary. eg: `onClick`
   */
  const renderBtn = (props = {}) => {
    const { label, type = 'button', ...rest } = props

    return (
      <button type={type} {...rest}>
        {label}
      </button>
    )
  }

  /**
   * renderSubmitBtn - renders a `submit` button element
   * @function
   * @param {{ label: string, spinner: boolean }} props - the props for the button. add any addition <button> attrs if necessary. eg: `style`
   */
  const renderSubmitBtn = (props = {}) => {
    const { label, spinner, ...rest } = props

    return (
      <Fragment>
        <button
          disabled={!formik.isValid || formik.isSubmitting}
          {...rest}
          type='submit'
        >
          {label}
        </button>
        {spinner && formik.isSubmitting && spinner}
      </Fragment>
    )
  }

  const fieldProps = (name) => ({
    name,
    id: name,
    value: formik.values[name],
    onChange: formik.handleChange
  })

  const data = {
    formik,
    renderInput,
    renderSelect,
    renderBtn,
    renderSubmitBtn,
    fieldProps
  }

  return render(data)
}

FormContainer.propTypes = {
  initialValues: object.isRequired,
  render: func.isRequired,
  onSubmit: func,
  /**
   * the `object` expected is from `yup.object()`
   *
   * @example
   * import * as Yup from "yup";
   * const validationSchema = Yup.object({
   *  age: Yup.number().typeError('must be a number'),
   *  name: Yup.string().required('required'),
   * })
   */
  validationSchema: object
}

export default FormContainer
