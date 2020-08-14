import React, { useState } from 'react'
import * as Yup from 'yup'
import { FormContainer } from 'react-richcode-form'

const initialValues = {
  name: '',
  msg: '',
  age: '',
  height: '',
  custom: ''
}

const onSubmit = (values, props) => {
  console.log(values)
  console.log('is submitting...')

  setTimeout(() => {
    props.setSubmitting(false)
    props.resetForm()
    console.log('submitted.')
  }, 3000)
}

const validationSchema = Yup.object({
  name: Yup.string().required('required'),
  msg: Yup.string(),
  age: Yup.string().required('required'),
  height: Yup.string().required('required'),
  custom: Yup.number().typeError('must be a number').required('required')
})

function Demo() {
  const formContainerProps = {
    initialValues,
    onSubmit,
    validationSchema
  }

  const heightOptions = [
    { value: 2, placeholder: 'two' },
    { value: 3.5, placeholder: 'three and half' },
    { value: 6, placeholder: '6ix' }
  ]

  const [displayAge, setDisplayAge] = useState(true)

  return (
    <div>
      <FormContainer
        {...formContainerProps}
        render={({
          formik,
          renderInput,
          renderTextarea,
          renderSelect,
          renderBtn,
          renderSubmitBtn,
          fieldProps
        }) => (
          <form onSubmit={formik.handleSubmit}>
            {renderInput({ name: 'name', label: 'Name' })}

            {renderTextarea({ name: 'msg', label: 'Message' })}

            {renderSelect({
              name: 'height',
              label: 'Height',
              options: heightOptions
            })}

            {displayAge &&
              renderInput({
                name: 'age',
                label: 'age',
                showErrorWhenNotFocused: true,
                placeholder: 'the age of this guy',
                onChange: ({ target }) => {
                  if (target.value === 'hide') setDisplayAge(false)
                }
              })}

            <div>
              <label htmlFor='custom'>the custom input</label>

              <input {...fieldProps('custom')} />

              {formik.errors.custom && <div>{formik.errors.custom}</div>}
            </div>

            {renderBtn({
              label: 'custom btn',
              onClick: () => {
                console.log('the custom btn clicked')
              }
            })}

            <button
              type='button'
              onClick={() => {
                if (formik.values.name) {
                  formik.handleReset()
                }
              }}
            >
              reset form is name is valid
            </button>

            {renderSubmitBtn({
              label: 'submit',
              spinner: true,
              style: { color: 'red' },
              onClick: () => {
                console.log('the submit btn clicked')
              }
            })}
          </form>
        )}
      />
    </div>
  )
}

export default Demo

