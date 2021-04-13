import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { Todo_todo$key } from './__generated__/Todo_todo.graphql'
import { tw } from 'twind'
import Link from '../router/Link'
import RenameTodoMutation from '../mutations/RenameTodoMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import { Todo_user$key } from './__generated__/Todo_user.graphql'
import InputInline from './InputInline'
import Button from './Button'
import { useHistory } from '../router/RoutingContext'
import React, { ChangeEvent, Suspense } from 'react'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import TodoDescription from './TodoDescription'

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
        ...TodoDescription_todo
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

  const history = useHistory()

  const onDelete = () => {
    RemoveTodoMutation.commit(environment, todo, user)
    history.push('/')
  }

  const onSave = (text: string) => {
    RenameTodoMutation.commit(environment, text, todo)
  }

  const onChangeComplete = (e: ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked
    ChangeTodoStatusMutation.commit(environment, complete, todo, user)
  }

  return (
    <div className={tw`p-3 border flex flex-col space-y-2`}>
      <div className={tw`font-bold`}>Todo</div>
      <Link to={'/'}>Back</Link>
      <div className={tw`flex flex-row items-center`}>
        <input
          checked={!!todo.complete}
          className={tw`form-checkbox`}
          onChange={onChangeComplete}
          type="checkbox"
          aria-label={todo.text}
        />
        <InputInline defaultValue={todo.text} onSave={onSave} />
      </div>
      <Suspense fallback={<InputInline defaultValue={'Loading...'} disabled />}>
        <TodoDescription todo={todo} />
      </Suspense>
      <Button onClick={onDelete}>Delete</Button>
    </div>
  )
}
