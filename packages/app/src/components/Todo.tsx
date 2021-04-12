import { graphql, useFragment } from 'react-relay'
import { Todo_todo$key } from './__generated__/Todo_todo.graphql'
import { tw } from 'twind'
import Link from '../router/Link'

export interface TodoProps {
  todo: Todo_todo$key
}

export default function Todo(props: TodoProps) {
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        id
        text
      }
    `,
    props.todo,
  )
  return (
    <div className={tw`p-1 border`}>
      <div className={tw`font-bold`}>Todo</div>
      <Link to={'/'}>Back</Link>
      <div>{todo.text}</div>
    </div>
  )
}
