// @flow
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { GraphQLID, GraphQLNonNull } from 'graphql'
import { GraphQLUser } from '../nodes'
import { getUserOrThrow, removeTodo, User } from '../../database'

type Input = {|
  +id: string,
  +userId: string,
|}

type Payload = {|
  +id: string,
  +userId: string,
|}

const RemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedTodoId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ id }: Payload): string => id,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: Payload): User => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({ id, userId }: Input): Payload => {
    const localTodoId = fromGlobalId(id).id
    removeTodo(localTodoId)

    return { id, userId }
  },
})

export { RemoveTodoMutation }
