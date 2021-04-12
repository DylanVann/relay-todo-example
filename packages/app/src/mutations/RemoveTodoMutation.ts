import { commitMutation, graphql } from 'react-relay'
import {
  ConnectionHandler,
  Environment,
  RecordSourceSelectorProxy,
} from 'relay-runtime'
import { RemoveTodoMutation } from './__generated__/RemoveTodoMutation.graphql'

interface User {
  id: string
  userId: string
}

interface Todo {
  id: string
}

function sharedUpdater(
  store: RecordSourceSelectorProxy,
  user: User,
  deletedID: string,
) {
  const userProxy = store.get(user.id)
  const conn = ConnectionHandler.getConnection(userProxy!, 'TodoList_todos')
  ConnectionHandler.deleteNode(conn!, deletedID)
}

function commit(environment: Environment, todo: Todo, user: User) {
  return commitMutation<RemoveTodoMutation>(environment, {
    mutation: graphql`
      mutation RemoveTodoMutation($input: RemoveTodoInput!) {
        removeTodo(input: $input) {
          deletedTodoId
          user {
            completedCount
            totalCount
          }
        }
      }
    `,
    variables: {
      input: { id: todo.id, userId: user.userId },
    },
    updater: (store) => {
      const payload = store.getRootField('removeTodo')
      if (!payload) throw new Error('assertion failed')
      sharedUpdater(store, user, payload.getValue('deletedTodoId') as string)
    },
    optimisticUpdater: (store) => {
      sharedUpdater(store, user, todo.id)
    },
  })
}

export default { commit }
