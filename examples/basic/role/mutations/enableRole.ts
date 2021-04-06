import { GraphQLNonNull, GraphQLID } from 'graphql'
import { getMutation, dbTransaction } from '@userlab/dx'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { Role, RoleModel, RoleType } from '../Role'

export interface RoleEnable {
  id: string
}

export default getMutation<Role, RoleEnable, AppContext>({
  name: 'RoleEnable',
  outputType: RoleType,
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async ({ id }) =>
    dbTransaction(async connection => {
      await RoleModel.update(
        { isDisabled: false },
        { ...dbOptions, where: { id }, connection }
      )

      return id
    }, dbOptions),
})
