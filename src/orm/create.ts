import { DxArgs, DBOptions } from '../types'
import { isDefined } from '../jsutils'
import { query } from '../db'

export const create = <TObject, TCreateObject>({
  table,
  fields,
}: DxArgs) => async (
  values: TCreateObject,
  options: DBOptions
): Promise<TObject> => {
  const _fields = []
  const _values = []

  for (const [key, field] of Object.entries(fields)) {
    const sqlColumn = field.sqlColumn || key

    let sqlValue = (values as any)[key]

    if (!isDefined(sqlValue) && isDefined(field.defaultValue)) {
      sqlValue =
        typeof field.defaultValue === 'function'
          ? field.defaultValue()
          : field.defaultValue
    }

    if (!isDefined(sqlValue) && JSON.stringify(field.type).indexOf('!') >= 0) {
      throw new Error(
        `The field "${key}" is required. Invalid value (${sqlValue}).`
      )
    }

    if (isDefined(sqlValue)) {
      _fields.push(sqlColumn)
      _values.push(sqlValue)
    }
  }

  const sql = `
    INSERT INTO ${table}
      (${_fields.join(', ')})
    VALUES
      (${_fields.map((_, i) => `$${i + 1}`).join(', ')})
    RETURNING *;
  `

  const results = await query(sql, _values, options)

  return results[0] as TObject
}
