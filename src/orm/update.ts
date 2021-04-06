import { DxArgs, DBOptions } from '../types'
import { query } from '../db'
import { isDefined } from '../jsutils'

export const update = <TObject>({ table, fields }: DxArgs) => async (
  values: Partial<TObject>,
  options: DBOptions
) => {
  const _values: any[] = []
  const _fields = Object.keys(values).map((key, i) => {
    if (!isDefined(fields[key])) throw new Error(`Invalid field ${key}`)

    const sqlColumn = fields[key].sqlColumn || key
    _values.push((values as any)[key])
    return `${sqlColumn} = $${i + 1}`
  })

  if (_fields.length === 0)
    throw new Error(`At least one field is required for the update`)

  const conditions: string[] = []

  if (options.where) {
    Object.keys(options.where).forEach((key, i) => {
      if (!isDefined(fields[key])) throw new Error(`Invalid field ${key}`)

      const sqlColumn = fields[key].sqlColumn || key
      conditions.push(`${sqlColumn} = $${_values.length + i + 1}`)
      _values.push(options.where?.[key])
    })
  }

  const sql = `
    UPDATE ${table}
    SET ${_fields.join(`,
    `)}
    ${conditions.length > 0 ? `WHERE ${conditions.join(` AND `)}` : ''}
  `

  await query(sql, _values, options)

  return
}
