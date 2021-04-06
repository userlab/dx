import { DBOptions } from '../types'
import { getConnection } from './getConnection'

export const query = async (
  sql: string,
  params: any,
  { connection, dbConfig, dbLogging }: DBOptions
): Promise<any[]> => {
  try {
    const client = connection ? connection : await getConnection({ dbConfig })

    if (dbLogging) dbLogging(sql, params)

    const res = await client.query(sql, params)

    if (!connection) {
      await client.end()
    }

    return res.rows
  } catch (err) {
    console.log('query', err.message)

    throw err
  }
}
