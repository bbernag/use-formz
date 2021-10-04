import React from 'react'

export interface userFormProps {
  errors: any
  register: (props: registerProps) => registerReturns
  onSubmit: (
    submitCallback: (model: object) => void
  ) => (event: React.FormEvent<HTMLFormElement>) => void
}

type registerProps = {
  name: string
  validations: object
}

interface registerReturns extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const validators = {
  minLength:
    (minLengthValue: Number) =>
    (value = '') =>
      value.length >= minLengthValue,
  maxLength:
    (maxLengthValue: Number) =>
    (value = '') =>
      value.length <= maxLengthValue,
  required: () => (value: string | number | boolean) => !!value,
  email: () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (value = '') => {
      return re.test(String(value).toLowerCase())
    }
  },
  numeric: () => {
    const re = /^\d+$/
    return (value = '') => {
      return re.test(value)
    }
  }
}

function useForm() {
  const [errors, setErrors] = React.useState({})
  const modelRef: any = React.useRef({})
  const validationsRef = React.useRef({})

  const onChange = React.useCallback((event) => {
    const {
      target: { name, value }
    } = event

    modelRef.current[name] = value
  }, [])

  const register = React.useCallback(
    ({ name, value, validations }) => {
      if (!modelRef.current[name]) {
        modelRef.current[name] = value
      }

      if (!validationsRef.current[name] && validations) {
        validationsRef.current[name] = validations
      }

      return {
        id: name,
        name,
        defaultValue: value,
        onChange
      }
    },
    [onChange]
  )

  const onSubmit = React.useCallback((submitCallback) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const errors = {}
      Object.entries(modelRef.current).forEach(([field, fieldValue]) => {
        if (validationsRef.current[field]) {
          Object.entries(validationsRef.current[field]).forEach(
            ([validatorName, validatorValue]) => {
              const isValid =
                validators[validatorName](validatorValue)(fieldValue)
              if (!isValid) {
                errors[field] = true
              }
            }
          )
        }
      })

      if (Object.keys(errors).length) {
        setErrors(errors)
        return
      }
      setErrors({})
      submitCallback(modelRef.current)
    }
  }, [])

  return { errors, register, onSubmit }
}

export default useForm
