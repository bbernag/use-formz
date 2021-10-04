import React from 'react'
import useForm, { userFormProps } from 'react-useform'
import 'react-useform/dist/index.css'

const App = () => {
  const { errors, register, onSubmit }: userFormProps = useForm()

  return (
    <div className='form'>
      <form
        onSubmit={onSubmit((model: object) => {
          alert(
            'Form submitted correctly, please check the console to see the model'
          )
          console.log('model', model)
        })}
      >
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            {...register({
              name: 'name',
              validations: { required: true, minLength: 1, maxLength: 10 }
            })}
          />
          {errors.name && <span>Please enter a valid name</span>}
        </div>
        <div>
          <label htmlFor='last'>Last name:</label>
          <input
            {...register({
              name: 'last',
              validations: { required: true, minLength: 2, maxLength: 10 }
            })}
          />
          {errors.last && <span>Please enter a valid last name</span>}
        </div>
        <div>
          <label htmlFor='age'>Age:</label>
          <input
            {...register({
              name: 'age',
              validations: { numeric: true, minLength: 1, maxLength: 3 }
            })}
          />
          {errors.age && <span>Please enter a valid age</span>}
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            {...register({
              name: 'email',
              validations: { email: true }
            })}
          />
          {errors.email && <span>Please enter a valid email</span>}
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
