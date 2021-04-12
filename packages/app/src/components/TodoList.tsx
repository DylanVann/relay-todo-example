import { graphql, useFragment } from 'react-relay'
import TodoListItem from './TodoListItem'
import { TodoList_user$key } from './__generated__/TodoList_user.graphql'
import { tw } from 'twind'

export interface TodoListProps {
  user: TodoList_user$key
}

export default function TodoList(props: TodoListProps) {
  const user = useFragment(
    graphql`
      fragment TodoList_user on User {
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
              ...TodoListItem_todo
            }
          }
        }
        id
        userId
        totalCount
        completedCount
        ...TodoListItem_user
      }
    `,
    props.user,
  )

  if (!user.todos || !user.todos.edges) {
    throw new Error('assertion failed')
  }

  return (
    <div className={tw`p-1 flex flex-col border`}>
      <div className={tw`font-bold`}>TodoList</div>
      <ul className={tw`flex flex-col space-y-2`}>
        {user.todos.edges.map((edge) => {
          const node = edge && edge.node
          if (!node) throw new Error('assertion failed')
          return <TodoListItem key={node.id} todo={node} user={user} />
        })}
      </ul>
    </div>
  )
}
