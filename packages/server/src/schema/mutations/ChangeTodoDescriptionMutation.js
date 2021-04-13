// @flow
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLTodo } from '../nodes'
import { changeTodoDescription, getTodoOrThrow, Todo } from '../../database'

type Input = {|
  +id: string,
  +description: string,
|}

type Payload = {|
  +localTodoId: string,
|}

const ChangeTodoDescriptionMutation = mutationWithClientMutationId({
  name: 'ChangeTodoDescription',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLString },
  },
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({ localTodoId }: Payload): Todo => getTodoOrThrow(localTodoId),
    },
  },
  mutateAndGetPayload: ({ id, description }: Input): Payload => {
    const localTodoId = fromGlobalId(id).id
    changeTodoDescription(localTodoId, description)
    return { localTodoId }
  },
})

export { ChangeTodoDescriptionMutation }
