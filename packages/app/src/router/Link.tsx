import RoutingContext from './RoutingContext'
import { ReactNode, useCallback, useContext } from 'react'
import { tw } from 'twind'
import classNames from 'classnames'

export interface LinkProps {
  to: string
  className?: string
  children: ReactNode
}

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 */
export default function Link(props: LinkProps) {
  const router = useContext(RoutingContext)

  if (!router) {
    throw new Error('Missing router.')
  }

  // When the user clicks, change route
  const changeRoute = useCallback(
    (event) => {
      event.preventDefault()
      router.history.push(props.to)
    },
    [props.to, router],
  )

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    router.preloadCode(props.to)
  }, [props.to, router])

  // Callback to preload the code and data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  const preloadRoute = useCallback(() => {
    router.preload(props.to)
  }, [props.to, router])

  return (
    <a
      className={classNames(tw`underline`, props.className)}
      href={props.to}
      onClick={changeRoute}
      onMouseEnter={preloadRouteCode}
      onMouseDown={preloadRoute}
    >
      {props.children}
    </a>
  )
}
