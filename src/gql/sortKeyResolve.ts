import { SortKey } from 'join-monster'
import { FieldConfigMap } from '../types'
import { isArray, isString } from '../jsutils'

export const sortKeyResolve = ({
  fields,
  uniqueKey,
}: {
  fields: FieldConfigMap
  uniqueKey: string | string[]
}) => {
  return (args: any) => {
    const order = args.order || 'DESC'

    const key =
      args.orderBy?.map((field: string) => {
        if (!fields[field]) throw new Error('Invalid orderBy key')

        if (fields[field]['sqlColumn']) return fields[field]['sqlColumn']

        return field
      }) || []

    if (isArray(uniqueKey)) {
      uniqueKey.forEach((field: string) =>
        !key.includes(field) ? key.push(field) : null
      )
    }

    if (isString(uniqueKey) && !key.includes(uniqueKey)) {
      key.push(uniqueKey)
    }

    return { order, key } as SortKey
  }
}
