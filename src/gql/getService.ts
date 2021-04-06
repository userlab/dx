import {
  GraphQLFieldConfig,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql'
import { joinMonsterResolve } from './joinMonsterResolve'

export const getService = (
  objectType: GraphQLObjectType
): GraphQLFieldConfig<any, any> => {
  return {
    type: objectType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    extensions: {
      joinMonster: {
        where: (table: string, { id }: any) => `${table}.id = '${id}'`,
      },
    },
    resolve: joinMonsterResolve,
  }
}
