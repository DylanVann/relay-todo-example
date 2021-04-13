import { commitMutation, graphql } from 'react-relay'
import { Environment } from 'relay-runtime'

interface Todo {
  id: string
}

function getOptimisticResponse(description: string, todo: Todo) {
  return {
    changeTodoDescription: {
      todo: {
        id: todo.id,
        description,
      },
    },
  }
}

function commit(environment: Environment, description: string, todo: Todo) {
  return commitMutation(environment, {
    mutation: graphql`
      mutation ChangeTodoDescriptionMutation(
        $input: ChangeTodoDescriptionInput!
      ) {
        changeTodoDescription(input: $input) {
          todo {
            id
            description
          }
        }
      }
    `,
    variables: {
      input: { description, id: todo.id },
    },
    optimisticResponse: getOptimisticResponse(description, todo),
  })
}

export default { commit }
