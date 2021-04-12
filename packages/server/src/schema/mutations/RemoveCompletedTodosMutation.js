// @flow
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay'
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLUser } from '../nodes'
import { getUserOrThrow, removeCompletedTodos, User } from '../../database'

type Input = {|
  +userId: string,
|}

type Payload = {|
  +deletedTodoIds: $ReadOnlyArray<string>,
  +userId: string,
|}

const RemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  inputFields: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      resolve: ({ deletedTodoIds }: Payload): $ReadOnlyArray<string> =>
        deletedTodoIds,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({ userId }: Payload): User => getUserOrThrow(userId),
    },
  },
  mutateAndGetPayload: ({ userId }: Input): Payload => {
    const deletedTodoLocalIds = removeCompletedTodos()

    const deletedTodoIds = deletedTodoLocalIds.map(
      toGlobalId.bind(null, 'Todo'),
    )

    return { deletedTodoIds, userId }
  },
})

export { RemoveCompletedTodosMutation }
