// @flow
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay'

import {
  getTodoOrThrow,
  getTodos,
  getUserOrThrow,
  Todo,
  User,
  USER_ID,
} from '../database'

// $FlowFixMe graphql-relay types not available in flow-typed, strengthen this typing
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId: string): ?{} => {
    const { type, id }: { id: string, type: string } = fromGlobalId(globalId)

    if (type === 'Todo') {
      return getTodoOrThrow(id)
    } else if (type === 'User') {
      return getUserOrThrow(id)
    }
    return null
  },
  (obj: {}): ?GraphQLObjectType => {
    if (obj.type === 'todo') {
      return GraphQLTodo
    } else if (obj.type === 'user') {
      return GraphQLUser
    }
    return null
  },
)

const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo: Todo): string => todo.text,
    },
    description: {
      type: GraphQLString,
      resolve: (todo: Todo): string => todo.description,
    },
    complete: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (todo: Todo): boolean => todo.complete,
    },
  },
  interfaces: [nodeInterface],
})

const {
  connectionType: TodosConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: GraphQLTodo,
})

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (): string => USER_ID,
    },
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        // $FlowFixMe
        ...connectionArgs,
      },
      // eslint-disable-next-line flowtype/require-parameter-type
      resolve: (root: {}, { status, after, before, first, last }) =>
        connectionFromArray([...getTodos(status)], {
          after,
          before,
          first,
          last,
        }),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (): number => getTodos().length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (): number => getTodos('completed').length,
    },
  },
  interfaces: [nodeInterface],
})

export { nodeField, GraphQLTodo, GraphQLTodoEdge, GraphQLUser }
