import { commitMutation, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import { MarkAllTodosMutation } from './__generated__/MarkAllTodosMutation.graphql'
import { TodoList_user } from '../components/__generated__/TodoList_user.graphql'

function getOptimisticResponse(
  complete: boolean,
  todos: TodoList_user['todos'],
  user: TodoList_user,
) {
  const payload: any = { user: { id: user.id } }
  if (todos && todos.edges) {
    payload.changedTodos = todos.edges
      .filter((edge) => edge && edge.node && edge.node.complete !== complete)
      .map((edge) => ({
        complete: complete,
        id: edge && edge.node && edge.node.id,
      }))
  }
  if (user.totalCount != null) {
    payload.user.completedCount = complete ? user.totalCount : 0
  }
  return {
    markAllTodos: payload,
  }
}

function commit(
  environment: Environment,
  complete: boolean,
  todos: TodoList_user['todos'],
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
    optimisticResponse: getOptimisticResponse(complete, todos, user),
  })
}

export default { commit }
