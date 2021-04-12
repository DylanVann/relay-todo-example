import { graphql, usePreloadedQuery } from 'react-relay'
import TodoApp from '../components/TodoApp'
import { TodoAppRootQuery } from './__generated__/TodoAppRootQuery.graphql'

export interface TodoListRootProps {
  prepared: {
    query: any
  }
}

export default function TodoAppRoot(props: TodoListRootProps) {
  const data = usePreloadedQuery<TodoAppRootQuery>(
    graphql`
      query TodoAppRootQuery($id: String!) {
        user(id: $id) {
          ...TodoApp_user
        }
      }
    `,
    props.prepared.query,
  )

  if (!data.user) {
    throw new Error('No user')
  }

  return <TodoApp user={data.user} />
}
