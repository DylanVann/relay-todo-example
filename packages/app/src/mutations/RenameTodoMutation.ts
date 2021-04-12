import { commitMutation, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'
import { RenameTodoMutation } from './__generated__/RenameTodoMutation.graphql'

interface Todo {
  id: string
}

function getOptimisticResponse(text: string, todo: Todo) {
  return {
    renameTodo: {
      todo: {
        id: todo.id,
        text: text,
      },
    },
  }
}

function commit(environment: Environment, text: string, todo: Todo) {
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
