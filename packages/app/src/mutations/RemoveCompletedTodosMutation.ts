import { commitMutation, graphql } from 'react-relay'
import {
  ConnectionHandler,
  Environment,
  RecordSourceSelectorProxy,
} from 'relay-runtime'
import { RemoveCompletedTodosMutation } from './__generated__/RemoveCompletedTodosMutation.graphql'
import { TodoListFooter_user } from '../components/__generated__/TodoListFooter_user.graphql'

function sharedUpdater(
  store: RecordSourceSelectorProxy,
  user: TodoListFooter_user,
  deletedIDs: string[],
) {
  const userProxy = store.get(user.id)
  const conn = ConnectionHandler.getConnection(userProxy!, 'TodoList_todos')
  deletedIDs.forEach((deletedID) =>
    ConnectionHandler.deleteNode(conn!, deletedID),
  )
}

function commit(
  environment: Environment,
  todos: TodoListFooter_user['completedTodos'],
  user: TodoListFooter_user,
) {
  return commitMutation<RemoveCompletedTodosMutation>(environment, {
    mutation: graphql`
      mutation RemoveCompletedTodosMutation(
        $input: RemoveCompletedTodosInput!
      ) {
        removeCompletedTodos(input: $input) {
          deletedTodoIds
          user {
            completedCount
            totalCount
          }
        }
      }
    `,
    variables: {
      input: { userId: user.userId },
    },
    updater: (store) => {
      const payload = store.getRootField('removeCompletedTodos')
      if (!payload) throw new Error('assertion failed')
      sharedUpdater(store, user, payload.getValue('deletedTodoIds') as string[])
    },
    optimisticUpdater: (store) => {
      if (todos && todos.edges) {
        const deletedIDs = todos.edges
          .filter((edge) => edge && edge.node && edge.node.complete)
          .map((edge) => (edge && edge.node && edge.node.id) as string)
        sharedUpdater(store, user, deletedIDs)
      }
    },
  })
}

export default { commit }
