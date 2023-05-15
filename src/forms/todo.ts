import { object, string } from 'yup'

export const TodoFormSchema = object({
  todo: string().required().label('Todo')
})
