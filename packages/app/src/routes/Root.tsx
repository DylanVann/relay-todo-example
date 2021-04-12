import { graphql, usePreloadedQuery } from 'react-relay'
import { ReactNode } from 'react'
import { tw } from 'twind'
import { RootQuery } from './__generated__/RootQuery.graphql'

export interface RootProps {
  prepared: {
    query: any
  }
  children: ReactNode
}

export default function Root(props: RootProps) {
  const data = usePreloadedQuery<RootQuery>(
    graphql`
      query RootQuery($id: String!) {
        user(id: $id) {
          id
          userId
          completedCount
        }
      }
    `,
    props.prepared.query,
  )

  return (
    <div className={tw`flex flex-col space-y-2 p-1 border`}>
      <div className={tw`font-bold`}>Root</div>
      {props.children}
      <div>{data.user?.completedCount} completed</div>
    </div>
  )
}
