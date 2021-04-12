import TodoTextInput from './TodoTextInput'
import AddTodoMutation from '../mutations/AddTodoMutation'
import { useRelayEnvironment } from 'react-relay'
import { TodoApp_user } from './__generated__/TodoApp_user.graphql'
import { tw } from 'twind'

export interface TodoAppProps {
  user: TodoApp_user
}

export default function TodoAdd(props: TodoAppProps) {
  const environment = useRelayEnvironment()

  const handleTextInputSave = (text: string) => {
    AddTodoMutation.commit(environment, text, props.user)
  }

  return (
    <div className={tw`p-1 border flex flex-col`}>
      <div className={tw`font-bold`}>TodoAdd</div>
      <TodoTextInput
        autoFocus={true}
        onSave={handleTextInputSave}
        placeholder="What needs to be done?"
      />
    </div>
  )
}
