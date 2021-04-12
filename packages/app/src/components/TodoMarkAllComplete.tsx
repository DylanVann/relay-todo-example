import { ChangeEvent } from 'react'
import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation'
import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { TodoList_user$key } from './__generated__/TodoList_user.graphql'
import { tw } from 'twind'

export interface TodoMarkAllCompleteProps {
  user: TodoList_user$key
}

export default function TodoMarkAllComplete(props: TodoMarkAllCompleteProps) {
  const environment = useRelayEnvironment()

  const user = useFragment(
    graphql`
      fragment TodoMarkAllComplete_user on User {
        id
        userId
        totalCount
        completedCount
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
            }
          }
        }
      }
    `,
    props.user,
  )

  const numTodos = user.totalCount
  const numCompletedTodos = user.completedCount

  const handleMarkAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked
    MarkAllTodosMutation.commit(environment, complete, user.todos, user)
  }

  return (
    <div className={tw`p-1 border`}>
      <div className={tw`font-bold`}>TodoMarkAllComplete</div>
      <label className={tw`inline-flex items-center ml-1`}>
        <input
          checked={numTodos === numCompletedTodos}
          onChange={handleMarkAllChange}
          type="checkbox"
          className={tw`form-checkbox`}
        />
        <span className={tw`ml-2`}>Mark all as complete</span>
      </label>
    </div>
  )
}
