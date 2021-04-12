import { graphql, useFragment } from 'react-relay'
import TodoList from './TodoList'
import TodoListFooter from './TodoListFooter'
import { TodoApp_user$key } from './__generated__/TodoApp_user.graphql'
import TodoMarkAllComplete from './TodoMarkAllComplete'
import { tw } from 'twind'
import TodoAdd from './TodoAdd'

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
      }
    `,
    props.user,
  )

  const hasTodos = (user.totalCount || 0) > 0

  return (
    <section className={tw`flex flex-col space-y-2 border p-1`}>
      <div className={tw`font-bold`}>TodoApp</div>
      <TodoAdd user={user} />
      <TodoMarkAllComplete user={user} />
      <TodoList user={user} />
      {hasTodos && <TodoListFooter user={user} />}
    </section>
  )
}
