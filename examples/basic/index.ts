import express, { Request, Response } from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { dbOptions } from './constants'
import { schema } from './schema'

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.use('/dev/graphql', (req: Request, res: Response) => {
  const user = {
    id: '8202d443-e49e-42db-90c7-cd9b9296fbb3',
  }

  graphqlHTTP({
    schema,
    context: { ...dbOptions, user },
    graphiql: true,
  })(req, res)
})

app.listen(port, () => {
  console.log('listen on http://localhost:4000/dev/graphql')
})
