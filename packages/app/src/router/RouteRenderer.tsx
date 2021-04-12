import { Suspense, useContext, useEffect, useState } from 'react'
import RoutingContext from './RoutingContext'
import ErrorBoundary from '../utils/ErrorBoundary'
import { Entry, Match } from './createRouter'
import RouteComponent from './RouteComponent'
import { tw } from 'twind'

/**
 * A component that accesses the current route entry from RoutingContext and renders
 * that entry.
 */
export default function RouterRenderer() {
  // Access the router
  const router = useContext(RoutingContext)

  if (!router) {
    throw new Error('Must use router context.')
  }

  // Store the active entry in state - this allows the renderer to use features like
  // useTransition to delay when state changes become visible to the user.
  const [routeEntry, setRouteEntry] = useState(router.get())

  // On mount subscribe for route changes
  useEffect(() => {
    // Check if the route has changed between the last render and commit:
    const currentEntry = router.get()
    if (currentEntry !== routeEntry) {
      // if there was a concurrent modification, rerender and exit
      setRouteEntry(currentEntry)
      return
    }

    // If there *wasn't* a concurrent change to the route, then the UI
    // is current: subscribe for subsequent route updates
    const dispose = router.subscribe((nextEntry: Entry) => {
      // startTransition() delays the effect of the setRouteEntry (setState) call
      // for a brief period, continuing to show the old state while the new
      // state (route) is prepared.
      setRouteEntry(nextEntry)
    })
    return () => dispose()

    // Note: this hook updates routeEntry manually; we exclude that variable
    // from the hook deps to avoid recomputing the effect after each change
    // triggered by the effect itself.
    // eslint-disable-next-line
  }, [router])

  // The current route value is an array of matching entries - one entry per
  // level of routes (to allow nested routes). We have to map each one to a
  // RouteComponent to allow suspending, and also pass its children correctly.
  // Conceptually, we want this structure:
  // ```
  // <RouteComponent
  //   component={entry[0].component}
  //   prepared={entrry[0].prepared}>
  //   <RouteComponent
  //     component={entry[1].component}
  //     prepared={entry[1].prepared}>
  //       // continue for nested items...
  //   </RouteComponent>
  // </RouteComponent>
  // ```
  // To achieve this, we reverse the list so we can start at the bottom-most
  // component, and iteratively construct parent components w the previous
  // value as the child of the next one:
  const reversedItems = [...routeEntry.entries].reverse() // reverse is in place, but we want a copy so concat
  const firstItem: Match = reversedItems[0]
  // the bottom-most component is special since it will have no children
  // (though we could probably just pass null children to it)
  let routeComponent = (
    <RouteComponent
      component={firstItem.component}
      prepared={firstItem.prepared}
      routeData={firstItem.routeData}
    />
  )
  for (let ii = 1; ii < reversedItems.length; ii++) {
    const nextItem = reversedItems[ii]
    routeComponent = (
      <RouteComponent
        component={nextItem.component}
        prepared={nextItem.prepared}
        routeData={nextItem.routeData}
      >
        {routeComponent}
      </RouteComponent>
    )
  }

  // Routes can error so wrap in an <ErrorBoundary>
  // Routes can suspend, so wrap in <Suspense>
  return (
    <ErrorBoundary>
      <div className={tw`m-4`}>
        <Suspense fallback={'Loading...'}>
          {routeComponent}
          <div className={tw`prose mt-4`}>
            <strong>Relay Example TypeScript</strong>
            <ul>
              <li>Render-as-you-fetch</li>
              <li>Inline editing</li>
              <li>Nested routes</li>
              <li>Optimistic updates</li>
              <li>Paginated and searchable list view</li>
              <li>Detail view</li>
            </ul>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
