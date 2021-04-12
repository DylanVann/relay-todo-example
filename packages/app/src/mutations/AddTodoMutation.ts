import { commitMutation, graphql } from 'react-relay'
import {
  ConnectionHandler,
  Environment,
  RecordSourceSelectorProxy,
} from 'relay-runtime'

import { TodoApp_user } from '../components/__generated__/TodoApp_user.graphql'
import { AddTodoMutation } from './__generated__/AddTodoMutation.graphql'

function sharedUpdater(
  store: RecordSourceSelectorProxy,
  user: TodoApp_user,
  newEdge: any,
) {
  const userProxy = store.get(user.id)
  const conn = ConnectionHandler.getConnection(userProxy!, 'TodoList_todos')
  ConnectionHandler.insertEdgeAfter(conn!, newEdge)
}

let tempID = 0

function commit(environment: Environment, text: string, user: TodoApp_user) {
  return commitMutation<AddTodoMutation>(environment, {
    mutation: graphql`
      mutation AddTodoMutation($input: AddTodoInput!) {
        addTodo(input: $input) {
          todoEdge {
            __typename
            cursor
            node {
              complete
              id
              text
            }
          }
          user {
            id
            totalCount
          }
        }
      }
    `,
    variables: {
      input: {
        userId: 'me',
        text,
        clientMutationId: (tempID++).toString(),
      },
    },
    updater: (store) => {
      const payload = store.getRootField('addTodo')
      if (!payload) throw new Error('assertion failed')
      const newEdge = payload.getLinkedRecord('todoEdge')
      sharedUpdater(store, user, newEdge)
    },
    optimisticUpdater: (store) => {
      const id = 'client:newTodo:' + tempID++
      const node = store.create(id, 'Todo')
      node.setValue(text, 'text')
      node.setValue(id, 'id')
      const newEdge = store.create('client:newEdge:' + tempID++, 'TodoEdge')
      newEdge.setLinkedRecord(node, 'node')
      sharedUpdater(store, user, newEdge)
      const userProxy = store.get(user.id)
      if (!userProxy) throw new Error('assertion failed')
      userProxy.setValue(
        (userProxy.getValue('totalCount') as number) + 1,
        'totalCount',
      )
    },
  })
}

export default { commit }
