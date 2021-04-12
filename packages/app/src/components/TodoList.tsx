import { graphql, usePaginationFragment } from 'react-relay'
import TodoListItem from './TodoListItem'
import { TodoList_user$key } from './__generated__/TodoList_user.graphql'
import { tw } from 'twind'
import Button from './Button'

export interface TodoListProps {
  user: TodoList_user$key
}

export default function TodoList(props: TodoListProps) {
  const {
    data: user,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment(
    graphql`
      fragment TodoList_user on User
      @argumentDefinitions(
        cursor: { type: "String" }
        count: { type: "Int", defaultValue: 3 }
      )
      @refetchable(queryName: "TodoListPaginationQuery") {
        todos(first: $count, after: $cursor)
          @connection(key: "TodoList_todos") {
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

  let text = 'Load more'
  if (isLoadingNext) {
    text = 'Loading...'
  }
  if (!hasNext) {
    text = 'There is no more!'
  }
  return (
    <div className={tw`p-2 flex flex-col space-y-2 border`}>
      <div className={tw`font-bold cap-main`}>TodoList</div>
      <ul className={tw`flex flex-col space-y-2`}>
        {user.todos.edges.map((edge) => {
          const node = edge && edge.node
          if (!node) throw new Error('assertion failed')
          return <TodoListItem key={node.id} todo={node} user={user} />
        })}
      </ul>
      <Button disabled={!hasNext} onClick={() => loadNext(3)}>
        {text}
      </Button>
    </div>
  )
}
