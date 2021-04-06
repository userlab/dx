import { Client } from 'pg'
import { DBOptions } from '../types'

export const getConnection = async ({
  dbConfig,
}: DBOptions): Promise<Client> => {
  if (!dbConfig) throw new Error('dbConfig is required')

  try {
    const client = new Client(dbConfig)

    await client.connect()

    return client
  } catch (err) {
    console.log('getConnection', err.message)

    throw err
  }
}
