import { GraphQLString, GraphQLNonNull } from 'graphql'
import { getMutation, dbTransaction } from '@userlab/dx'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { Role, RoleCreate, RoleModel, RoleType } from '../Role'

export default getMutation<Role, RoleCreate, AppContext>({
  name: 'RoleCreate',
  outputType: RoleType,
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
  resolve: async input =>
    dbTransaction(async connection => {
      const role = await RoleModel.create(input, { ...dbOptions, connection })

      return role.id
    }, dbOptions),
})
