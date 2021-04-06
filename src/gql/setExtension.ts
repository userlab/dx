import { FieldConfigMap } from '../types'

export const setExtension = (fields: FieldConfigMap): FieldConfigMap => {
  Object.keys(fields).forEach(key => {
    const { junction, sqlColumn, sqlExpr, sqlJoin, ...field } = fields[key]

    if (junction || sqlColumn || sqlExpr || sqlJoin) {
      const config = {} as any

      if (junction) config.junction = junction
      if (sqlColumn) config.sqlColumn = sqlColumn
      if (sqlExpr) config.sqlExpr = sqlExpr
      if (sqlJoin) config.sqlJoin = sqlJoin

      fields[key] = { ...field, sqlColumn, extensions: { joinMonster: config } }
    }
  })

  return fields
}
