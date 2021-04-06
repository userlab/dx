import { DxArgs, DxReturn } from '../types'
import { getObjectType } from './getObjectType'
import { getService } from './getService'
import { getOrderByType } from './getOrderByType'
import { getWhereType } from './getWhereType'
import { getConnectionType } from './getConnectionType'
import { getConnection } from './getConnection'
import { createModel } from '../orm/createModel'

export const getQuery = <TObject, TCreateObject>(
  config: DxArgs
): DxReturn<TObject, TCreateObject> => {
  const objectType = getObjectType(config)
  const get = getService(objectType)

  const orderByType = getOrderByType(config)
  const whereType = getWhereType(config)

  const connectionType = getConnectionType(objectType)
  const connection = getConnection({
    connectionType,
    orderByType,
    whereType,
    fields: config.fields,
    uniqueKey: config.uniqueKey,
    defaultOrderBy: config.defaultOrderBy,
  })

  const model = createModel<TObject, TCreateObject>(config)

  return {
    objectType,
    get,
    orderByType,
    whereType,
    connectionType,
    connection,
    model,
  }
}
