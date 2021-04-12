import { graphql, useFragment, useRelayEnvironment } from 'react-relay'
import { TodoListFooter_user$key } from './__generated__/TodoListFooter_user.graphql'
import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation'
import Button from './Button'

export interface TodoListFooterProps {
  user: TodoListFooter_user$key
}

export default function TodoClearCompleted(props: TodoListFooterProps) {
  const environment = useRelayEnvironment()

  const user = useFragment(
    graphql`
      fragment TodoClearCompleted_user on User {
        id
        userId
        completedCount
      }
    `,
    props.user,
  )

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(environment, user)
  }

  return (
    <Button
      onClick={handleRemoveCompletedTodosClick}
      disabled={user.completedCount <= 0}
    >
      Clear completed
    </Button>
  )
}
