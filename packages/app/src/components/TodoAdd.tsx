import AddTodoMutation from '../mutations/AddTodoMutation'
import { useRelayEnvironment } from 'react-relay'
import { TodoApp_user } from './__generated__/TodoApp_user.graphql'
import { tw } from 'twind'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'

export interface TodoAppProps {
  user: TodoApp_user
}

export default function TodoAdd(props: TodoAppProps) {
  const environment = useRelayEnvironment()
  const [text, setText] = useState('')

  const addTodo = (text: string) => {
    AddTodoMutation.commit(environment, text, props.user)
  }

  return (
    <div className={tw`flex flex-row space-x-2 h-8`}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(text)
            setText('')
          }
        }}
        type="text"
        placeholder="What needs to be done?"
        className={tw`flex-1 px-1.5 py-0`}
      />
      <Button onClick={() => addTodo(text)}>Add</Button>
    </div>
  )
}
