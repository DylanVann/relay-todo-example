import { commitMutation, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import { RenameTodoMutation } from './__generated__/RenameTodoMutation.graphql'
import { TodoListItem_todo } from '../components/__generated__/TodoListItem_todo.graphql'

function getOptimisticResponse(text: string, todo: TodoListItem_todo) {
  return {
    renameTodo: {
      todo: {
        id: todo.id,
        text: text,
      },
    },
  }
}

function commit(
  environment: Environment,
  text: string,
  todo: TodoListItem_todo,
) {
  return commitMutation<RenameTodoMutation>(environment, {
    mutation: graphql`
      mutation RenameTodoMutation($input: RenameTodoInput!) {
        renameTodo(input: $input) {
          todo {
            id
            text
          }
        }
      }
    `,
    variables: {
      input: { text, id: todo.id },
    },
    optimisticResponse: getOptimisticResponse(text, todo),
  })
}

export default { commit }
