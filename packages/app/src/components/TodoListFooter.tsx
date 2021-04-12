import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation'
import { TodoListFooter_user$key } from './__generated__/TodoListFooter_user.graphql'
import { tw } from 'twind'

export interface TodoListFooterProps {
  user: TodoListFooter_user$key
}

export default function TodoListFooter(props: TodoListFooterProps) {
  const environment = useRelayEnvironment()

  const user = useFragment(
    graphql`
      fragment TodoListFooter_user on User {
        id
        userId
        completedCount
        completedTodos: todos(status: "completed", first: 2147483647) {
          edges {
            node {
              id
              complete
            }
          }
        }
        totalCount
      }
    `,
    props.user,
  )

  const numCompletedTodos = user.completedCount || 0
  const numRemainingTodos = (user.totalCount || 0) - numCompletedTodos

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(environment, user.completedTodos, user)
  }

  return (
    <div className={tw`p-1 border flex flex-col space-y-2`}>
      <div className={tw`font-bold`}>TodoListFooter</div>
      <div className={tw`p-1 border`}>
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? '' : 's'} left
      </div>
      {numCompletedTodos > 0 && (
        <button
          className="p-1 border"
          onClick={handleRemoveCompletedTodosClick}
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
