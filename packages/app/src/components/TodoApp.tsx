import { graphql, useFragment } from 'react-relay'
import TodoList from './TodoList'
import TodoListFooter from './TodoListFooter'
import { TodoApp_user$key } from './__generated__/TodoApp_user.graphql'
import TodoMarkAllComplete from './TodoMarkAllComplete'
import { tw } from 'twind'
import TodoAdd from './TodoAdd'
import TodoClearCompleted from './TodoClearCompleted'

export interface TodoAppProps {
  user: TodoApp_user$key
}

export default function TodoApp(props: TodoAppProps) {
  const user = useFragment(
    graphql`
      fragment TodoApp_user on User {
        id
        totalCount
        ...TodoMarkAllComplete_user
        ...TodoListFooter_user
        ...TodoList_user
        ...TodoClearCompleted_user
      }
    `,
    props.user,
  )

  const hasTodos = (user.totalCount || 0) > 0

  return (
    <section className={tw`flex flex-col space-y-2 border p-2`}>
      <span className={tw`font-bold cap-main`}>TodoApp</span>
      <TodoAdd user={user} />
      <div className={tw`flex flex-row space-x-2`}>
        <TodoMarkAllComplete user={user} />
        <TodoClearCompleted user={user} />
      </div>
      <TodoList user={user} />
      {hasTodos && <TodoListFooter user={user} />}
    </section>
  )
}
