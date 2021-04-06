import joinMonster from 'join-monster'
import { query } from '../db'

export const joinMonsterResolve = (
  _root: any,
  _args: any,
  context: any,
  resolveInfo: any
) => {
  const { dbConfig, dbLogging } = context || {}

  if (!dbConfig) throw new Error('dbConfig must be set on the GraphQL context')

  return joinMonster(
    resolveInfo,
    context,
    (sql: string) => query(sql, null, { dbConfig, dbLogging }),
    { dialect: 'pg' }
  )
}
