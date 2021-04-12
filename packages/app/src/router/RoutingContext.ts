import { createContext, useContext } from 'react'
import { History } from 'history'
import { Router } from './createRouter'

const RoutingContext = createContext<null | Router>(null)

export const useHistory = (): History => {
  return useContext(RoutingContext).history
}

export default RoutingContext
