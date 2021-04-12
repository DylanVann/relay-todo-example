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

function commit(environment: Environment, user: TodoListFooter_user) {
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
      const userRecord = store.get(user.id)!
      if (!userRecord) return

      const todos = ConnectionHandler.getConnection(
        userRecord,
        'TodoList_todos',
      )
      if (!todos) return

      const edges = todos?.getLinkedRecords('edges')
      if (!edges) {
        return
      }

      userRecord.setValue(0, 'completedCount')

      const deleteIds: string[] = []
      edges.forEach((edge) => {
        const node = edge.getLinkedRecord('node')
        const id = node?.getValue('id') as string
        const completed = node?.getValue('complete') as boolean
        console.log('id', id)
        console.log('completed', completed)
        if (id && completed) {
          deleteIds.push(id)
        }
      })
      sharedUpdater(store, user, deleteIds)
    },
  })
}

export default { commit }
