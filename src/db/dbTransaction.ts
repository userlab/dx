import { Client } from 'pg'
import { DBOptions } from '../types'
import { getConnection } from './getConnection'

export const dbTransaction = async (
  func: (connection: Client) => Promise<string>,
  { dbConfig }: DBOptions
): Promise<string> => {
  let client: Client | undefined

  try {
    client = await getConnection({ dbConfig })

    await client.query('BEGIN')

    const result = await func(client)

    await client.query('COMMIT')
    await client.end()

    return result
  } catch (error) {
    if (client && typeof client.query === 'function') {
      await client.query('ROLLBACK')
      await client.end()
    }

    console.log('dbTransaction', error.message)
    throw error
  }
}
