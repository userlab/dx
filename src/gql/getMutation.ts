import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql'
import { MutationConfig, Mutation } from '../types'
import { joinMonsterResolve } from './joinMonsterResolve'

export const getMutation = <TReturn, TInput, TContext = any>({
  name,
  description,
  outputType,
  inputFields,
  resolve,
}: MutationConfig<TInput, TContext>): Mutation<TReturn, TInput> => {
  if (!name || !outputType || !inputFields)
    throw new Error('name, outputType and inputFields are required in getQuery')

  if (Object.keys(inputFields).length === 0)
    throw new Error('fields in getQuery must have at least one field')

  const inputType = new GraphQLInputObjectType({
    name: `${name}Input`,
    fields: inputFields,
  })

  return {
    type: outputType,
    description,
    args: {
      input: { type: new GraphQLNonNull(inputType) },
    },
    extensions: {
      joinMonster: {
        where: (table, _, { objectMutationId }) => {
          if (!objectMutationId)
            throw new Error('Invalid objectMutationId in context')

          return `${table}.id = '${objectMutationId}'`
        },
      },
    },
    resolve: async (root, args, context, resolveInfo) => {
      if (!args.input) throw new Error('Invalid input')

      context.objectMutationId = await resolve(args.input, context)

      return joinMonsterResolve(root, args, context, resolveInfo)
    },
  }
}
