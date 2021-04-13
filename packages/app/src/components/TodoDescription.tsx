import InputInline from './InputInline'
import ChangeTodoDescriptionMutation from '../mutations/ChangeTodoDescriptionMutation'
import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { TodoDescription_todo$key } from './__generated__/TodoDescription_todo.graphql'

export interface TodoDescriptionProps {
  todo: TodoDescription_todo$key
}

export default function TodoDescription(props: TodoDescriptionProps) {
  const environment = useRelayEnvironment()
  const todo = useFragment(
    graphql`
      fragment TodoDescription_todo on Todo {
        id
        description
      }
    `,
    props.todo,
  )
  const onSaveDescription = (text: string) => {
    ChangeTodoDescriptionMutation.commit(environment, text, todo)
  }
  return (
    <InputInline
      placeholder={'Add a description.'}
      defaultValue={todo.description || ''}
      onSave={onSaveDescription}
    />
  )
}
