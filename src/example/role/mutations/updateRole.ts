import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { getMutation, dbTransaction } from '../../../index'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { Role, RoleModel, RoleType } from '../Role'

export interface RoleUpdate {
  id: string
  name: string
  description?: string
}

export default getMutation<Role, RoleUpdate, AppContext>({
  name: 'RoleUpdate',
  outputType: RoleType,
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
  resolve: async ({ id, ...input }) =>
    dbTransaction(async connection => {
      await RoleModel.update(input, { ...dbOptions, where: { id }, connection })

      return id
    }, dbOptions),
})
