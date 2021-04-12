import {
  Environment,
  Network,
  RecordSource,
  ROOT_TYPE,
  Store,
} from 'relay-runtime'
import fetchGraphQL from './fetchGraphQL'

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: any, variables: any) {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`)
  return fetchGraphQL(params.text, variables)
}

// Export a singleton instance of Relay Environment configured with our network function:
const env = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource(), { gcReleaseBufferSize: 10 }),
  missingFieldHandlers: [
    {
      kind: 'linked',
      handle(field, record, argValues) {
        if (
          record != null &&
          record.__typename === ROOT_TYPE &&
          argValues.hasOwnProperty('id')
        ) {
          return argValues.id
        }
        return undefined
      },
    },
  ],
})

// @ts-ignore
if (process.env.NODE_ENV === 'development') {
  ;(window as any).relayEnvironment = env
  ;(window as any).debugRelayStore = () => env.getStore().getSource().toJSON()
}

export default env
