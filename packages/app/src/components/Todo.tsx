import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { Todo_todo$key } from './__generated__/Todo_todo.graphql'
import { tw } from 'twind'
import Link from '../router/Link'
import { ChangeEvent, useState } from 'react'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import RenameTodoMutation from '../mutations/RenameTodoMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import TodoTextInput from './TodoTextInput'
import { Todo_user$key } from './__generated__/Todo_user.graphql'

export interface TodoProps {
  todo: Todo_todo$key
  user: Todo_user$key
}

export default function Todo(props: TodoProps) {
  const environment = useRelayEnvironment()
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        id
        text
        complete
      }
    `,
    props.todo,
  )
  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    props.user,
  )

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked
    ChangeTodoStatusMutation.commit(environment, complete, todo, user)
  }

  const handleDestroyClick = () => {
    removeTodo()
  }

  const handleTextInputDelete = () => {
    removeTodo()
  }

  const handleTextInputSave = (text: string) => {
    RenameTodoMutation.commit(environment, text, todo)
  }

  const removeTodo = () => {
    RemoveTodoMutation.commit(environment, todo, user)
  }
  return (
    <div className={tw`p-1 border flex flex-col space-y-2`}>
      <div className={tw`font-bold`}>Todo</div>
      <Link to={'/'}>Back</Link>
      <TodoTextInput
        className={tw`p-0.5! -mx-0.5 -mb-0.5! border-none! flex-1`}
        commitOnBlur={true}
        initialValue={todo.text}
        onDelete={handleTextInputDelete}
        onSave={handleTextInputSave}
      />
    </div>
  )
}
