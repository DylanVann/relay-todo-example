import JSResource from '../utils/JSResource'
import { loadQuery } from 'react-relay'
import RelayEnvironment from '../environment/RelayEnvironment'
import RootQuery from './__generated__/RootQuery.graphql'
import TodoAppRootQuery from './__generated__/TodoAppRootQuery.graphql'
import TodoRootQuery from './__generated__/TodoRootQuery.graphql'
import { Route } from '../router/createRouter'

const routes: Route[] = [
  {
    component: JSResource('Root', () => import('./Root')),
    prepare: () => {
      return {
        query: loadQuery(RelayEnvironment, RootQuery, {
          id: 'me',
        }),
      }
    },
    routes: [
      {
        path: '/',
        exact: true,
        component: JSResource('TodoAppRoot', () => import('./TodoAppRoot')),
        prepare: () => {
          return {
            query: loadQuery(RelayEnvironment, TodoAppRootQuery, {
              id: 'me',
            }),
          }
        },
      },
      {
        path: '/todo/:id',
        component: JSResource('TodoRoot', () => import('./TodoRoot')),
        prepare: (params: { id: string }) => {
          return {
            query: loadQuery(RelayEnvironment, TodoRootQuery, {
              id: params.id,
              userId: 'me',
            }),
          }
        },
      },
    ],
  },
]

export default routes
