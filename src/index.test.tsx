import useForm from '.'
import { renderHook } from '@testing-library/react-hooks'

test('useForm', () => {
  const { result } = renderHook(() => useForm())
  const { errors, onSubmit, register } = result.current
  expect(errors).toMatchObject({})
  expect(onSubmit).toBeTruthy()
  expect(register({ name: 'name' }).name).toBe('name')
})
