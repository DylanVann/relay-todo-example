import { commitMutation, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import { TodoListItem_todo } from '../components/__generated__/TodoListItem_todo.graphql'
import { ChangeTodoStatusMutation } from './__generated__/ChangeTodoStatusMutation.graphql'
import { TodoListItem_user } from '../components/__generated__/TodoListItem_user.graphql'

interface User {
  id: string
  userId: string
  completedCount: number
}

interface Todo {
  id: string
}

function getOptimisticResponse(complete: boolean, todo: Todo, user: User) {
  const userPayload: { id: string; completedCount: number } = {
    id: user.id,
    completedCount: 0,
  }
  if (user.completedCount != null) {
    userPayload.completedCount = complete
      ? user.completedCount + 1
      : user.completedCount - 1
  }
  return {
    changeTodoStatus: {
      todo: {
        complete: complete,
        id: todo.id,
      },
      user: userPayload,
    },
  }
}

function commit(
  environment: Environment,
  complete: boolean,
  todo: Todo,
  user: User,
) {
  return commitMutation<ChangeTodoStatusMutation>(environment, {
    mutation: graphql`
      mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
        changeTodoStatus(input: $input) {
          todo {
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
      input: { complete, id: todo.id, userId: user.userId },
    },
    optimisticResponse: getOptimisticResponse(complete, todo, user),
  })
}

export default { commit }
