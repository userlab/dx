import { isDefined, isString, isArray } from '../jsutils'

export const getSqlValue = (value: unknown): string => {
  if (!isDefined(value)) return `NULL`

  if (value === 'DEFAULT') return `DEFAULT`

  if (isString(value)) return `'${value}'`

  if (isArray(value)) return `(${value.map(getSqlValue).join(', ')})`

  return `${value}`
}
