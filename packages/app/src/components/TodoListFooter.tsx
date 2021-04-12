import { graphql, useFragment } from 'react-relay'
import { TodoListFooter_user$key } from './__generated__/TodoListFooter_user.graphql'
import { tw } from 'twind'

export interface TodoListFooterProps {
  user: TodoListFooter_user$key
}

export default function TodoListFooter(props: TodoListFooterProps) {
  const user = useFragment(
    graphql`
      fragment TodoListFooter_user on User {
        id
        userId
        completedCount
        totalCount
      }
    `,
    props.user,
  )

  return (
    <span className={tw`cap-main`}>
      Completed {user.completedCount || 0} out of {user.totalCount || 0}.
    </span>
  )
}
