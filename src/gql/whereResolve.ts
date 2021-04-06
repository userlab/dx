import { FieldConfigMap } from '../types'
import { Operator, operators } from '../constants'
import { getSqlValue } from '../db'

export const getSqlCondition = (
  table: string,
  fields: FieldConfigMap,
  condition?: { [key: string]: any }
): string | null => {
  if (!condition) return null

  const field = Object.keys(condition)[0]

  if (field === 'or' || field === 'and') {
    if (condition[field].length === 0) return ''
    if (condition[field].length === 1)
      return getSqlCondition(table, fields, condition[field][0])

    const subconditions = condition[field]
    const subsqls = subconditions.map((subcondition: { [key: string]: any }) =>
      getSqlCondition(table, fields, subcondition)
    )
    return `(${subsqls.join(` ${field.toUpperCase()} `)})`
  } else {
    let key = fields[field].sqlColumn || field

    const _field = fields[field]
    if (_field && _field.sqlExpr && typeof _field.sqlExpr === 'function') {
      key = _field.sqlExpr(table, {}, null, null)
    } else {
      key = `${table}.${key}`
    }

    const operator = Object.keys(condition[field])[0] as Operator
    const value = condition[field][operator]

    // This is used when the user wants to filter the data by
    // location including the sublocations
    if (key === `${table}.location_id` && operator === `insub`) {
      return `${table}.location_id IN (
        WITH RECURSIVE sublocation AS (
            SELECT l.id FROM location l WHERE l.id = '${value}'
          UNION
            SELECT l.id FROM location l INNER JOIN sublocation S ON S.id = l.location_id
        ) SELECT id FROM sublocation
      )`
    }

    return `${key} ${operators[operator].sql} ${getSqlValue(value)}`
  }
}

export const whereResolve = ({ fields }: { fields: FieldConfigMap }) => {
  return (table: string, { where }: any, { user }: any) => {
    let condition = getSqlCondition(table, fields, where) || ''

    // Filter by user location
    if (fields.locationId && user?.locationId && user?.locations) {
      const fieldName = table === `"locations"` ? `id` : `location_id`

      if (condition) condition = `${condition} AND`

      condition = `${condition} ${table}.${fieldName} IN (${user.locations
        .map((locationId: string) => `'${locationId}'`)
        .join(',')})`
    }

    return condition
  }
}
