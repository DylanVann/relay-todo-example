// @flow
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema'

const port = process.env.PORT || 4000

const app = express()

app.use(cors())
app.options('*', cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  }),
)

app.get('/', (req, res) => {
  res.send('Ok')
})

app.listen(port, () => {
  console.log(`App is now running on http://localhost:${port}`)
})
