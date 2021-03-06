import { StrictMode } from 'react'
import { render } from 'react-dom'
import { RelayEnvironmentProvider } from 'react-relay'
import RelayEnvironment from './environment/RelayEnvironment'
import RoutingContext from './router/RoutingContext'
import createRouter from './router/createRouter'
import routes from './routes/routes'
import RouterRenderer from './router/RouteRenderer'
import { setupTwind } from './setupTwind'

setupTwind()

const router = createRouter(routes)

render(
  <StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RoutingContext.Provider value={router.context}>
        <RouterRenderer />
      </RoutingContext.Provider>
    </RelayEnvironmentProvider>
  </StrictMode>,
  document.getElementById('root'),
)
