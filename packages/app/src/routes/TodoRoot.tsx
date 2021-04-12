import { graphql, usePreloadedQuery } from 'react-relay'
import { TodoRootQuery } from './__generated__/TodoRootQuery.graphql'
import Todo from '../components/Todo'

export interface TodoRootProps {
  prepared: {
    query: any
  }
}

export default function TodoRoot(props: TodoRootProps) {
  const data = usePreloadedQuery<TodoRootQuery>(
    graphql`
      query TodoRootQuery($id: ID!, $userId: String!) {
        user(id: $userId) {
          ...Todo_user
        }
        node(id: $id) {
          ...Todo_todo
        }
      }
    `,
    props.prepared.query,
  )

  if (!data.user || !data.node) {
    throw new Error('No user')
  }

  return <Todo todo={data.node} user={data.user} />
}
