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
      query TodoRootQuery($id: ID!) {
        node(id: $id) {
          ...Todo_todo
        }
      }
    `,
    props.prepared.query,
  )

  return <Todo todo={data.node} />
}
