import { ChangeEvent, useState } from 'react'
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation'
import RemoveTodoMutation from '../mutations/RemoveTodoMutation'
import RenameTodoMutation from '../mutations/RenameTodoMutation'
import TodoTextInput from './TodoTextInput'
import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { TodoListItem_todo$key } from './__generated__/TodoListItem_todo.graphql'
import { TodoListItem_user$key } from './__generated__/TodoListItem_user.graphql'
import Link from '../router/Link'
import { tw } from 'twind'
import Button from './Button'

export interface TodoListItemProps {
  todo: TodoListItem_todo$key
  user: TodoListItem_user$key
}

export default function TodoListItem(props: TodoListItemProps) {
  const [isEditing, setIsEditing] = useState(false)

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

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked
    ChangeTodoStatusMutation.commit(environment, complete, todo, user)
  }

  const handleDestroyClick = () => {
    removeTodo()
  }

  const handleLabelDoubleClick = () => {
    setIsEditing(true)
  }

  const handleTextInputCancel = () => {
    setIsEditing(false)
  }

  const handleTextInputDelete = () => {
    setIsEditing(false)
    removeTodo()
  }

  const handleTextInputSave = (text: string) => {
    setIsEditing(false)
    RenameTodoMutation.commit(environment, text, todo)
  }

  const removeTodo = () => {
    RemoveTodoMutation.commit(environment, todo, user)
  }

  return (
    <li className={tw`border p-1 flex flex-row space-x-2 items-center`}>
      <div className={tw`flex-1 flex flex-row items-center space-x-2 ml-2`}>
        <input
          checked={!!todo.complete}
          className={tw`form-checkbox`}
          onChange={handleCompleteChange}
          type="checkbox"
          aria-label={todo.text}
        />
        {isEditing ? (
          <TodoTextInput
            className={tw`p-1! border-none! flex-1`}
            commitOnBlur={true}
            initialValue={todo.text}
            onCancel={handleTextInputCancel}
            onDelete={handleTextInputDelete}
            onSave={handleTextInputSave}
          />
        ) : (
          <span
            className={tw(isEditing && 'hidden', `flex-1 p-1`)}
            onDoubleClick={handleLabelDoubleClick}
          >
            {todo.text}
          </span>
        )}
      </div>
      <Button onClick={handleLabelDoubleClick}>Edit</Button>
      <Button onClick={handleDestroyClick}>Delete</Button>
      <Link to={`/todo/${todo.id}`}>View</Link>
    </li>
  )
}
