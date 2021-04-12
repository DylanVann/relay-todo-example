import { commitMutation, ConnectionHandler, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import { MarkAllTodosMutation } from './__generated__/MarkAllTodosMutation.graphql'
import { TodoList_user } from '../components/__generated__/TodoList_user.graphql'

function commit(
  environment: Environment,
  complete: boolean,
  user: TodoList_user,
) {
  return commitMutation<MarkAllTodosMutation>(environment, {
    mutation: graphql`
      mutation MarkAllTodosMutation($input: MarkAllTodosInput!) {
        markAllTodos(input: $input) {
          changedTodos {
            id
            complete
          }
          user {
            id
            completedCount
          }
        }
      }
    `,
    variables: {
      input: { complete, userId: user.userId },
    },
    optimisticUpdater: (store) => {
      const userRecord = store.get(user.id)
      if (!userRecord) return
      if (user.totalCount != null) {
        userRecord.setValue(complete ? user.totalCount : 0, 'completedCount')
      }

      const todos = ConnectionHandler.getConnection(
        userRecord,
        'TodoList_todos',
      )
      if (!todos) return

      const edges = todos?.getLinkedRecords('edges')
      if (!edges) {
        return
      }

      edges.forEach((edge) => {
        const node = edge.getLinkedRecord('node')
        if (!node) return
        const nodeComplete = node.getValue('complete')
        if (nodeComplete === complete) return
        node.setValue(complete, 'complete')
      })
    },
  })
}

export default { commit }
