import { ChangeEvent, useRef, useState } from 'react'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import RenameTodoMutation from '../mutations/RenameTodoMutation'
import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { TodoListItem_todo$key } from './__generated__/TodoListItem_todo.graphql'
import { TodoListItem_user$key } from './__generated__/TodoListItem_user.graphql'
import Link from '../router/Link'
import { tw } from 'twind'
import Button from './Button'
import InputInline from './InputInline'

export interface TodoListItemProps {
  todo: TodoListItem_todo$key
  user: TodoListItem_user$key
}

export default function TodoListItem(props: TodoListItemProps) {
  const environment = useRelayEnvironment()

  const todo = useFragment(
    graphql`
      fragment TodoListItem_todo on Todo {
        complete
        id
        text
      }
    `,
    props.todo,
  )

  const user = useFragment(
    graphql`
      fragment TodoListItem_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    props.user,
  )

  const onChangeComplete = (e: ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked
    ChangeTodoStatusMutation.commit(environment, complete, todo, user)
  }

  const onClickDelete = () => {
    RemoveTodoMutation.commit(environment, todo, user)
  }

  const nameInputRef = useRef<HTMLInputElement | null>(null)

  const onClickEdit = () => {
    nameInputRef.current?.focus()
  }

  const onSave = (text: string) => {
    RenameTodoMutation.commit(environment, text, todo)
  }

  return (
    <li className={tw`border p-1 flex flex-row space-x-2 items-center`}>
      <div className={tw`flex-1 flex flex-row items-center space-x-2 ml-2`}>
        <input
          checked={!!todo.complete}
          className={tw`form-checkbox`}
          onChange={onChangeComplete}
          type="checkbox"
          aria-label={todo.text}
        />
        <InputInline
          ref={nameInputRef}
          className={tw`flex-1`}
          defaultValue={todo.text}
          onSave={onSave}
        />
      </div>
      <Button onClick={onClickEdit}>Edit</Button>
      <Button onClick={onClickDelete}>Delete</Button>
      <Link to={`/todo/${todo.id}`}>View</Link>
    </li>
  )
}
