export const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'amber_new',
  user: 'backend',
  passowrd: 'QazPlm123',
}

export const dbLogging = (sql: string, params: unknown): void =>
  console.log(sql, params)

export const dbOptions = { dbConfig, dbLogging }
