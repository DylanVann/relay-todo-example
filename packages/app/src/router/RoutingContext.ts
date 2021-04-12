import { createContext, useContext } from 'react'
import { History } from 'history'
import { Router } from './createRouter'

const RoutingContext = createContext<null | Router>(null)

export const useHistory = (): History => {
  const router = useContext(RoutingContext)
  if (!router) {
    throw new Error('Error')
  }
  return router.history
}

export default RoutingContext
