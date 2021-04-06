import { GraphQLNonNull, GraphQLID } from 'graphql'
import { getMutation, dbTransaction } from '../../../index'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { Role, RoleModel, RoleType } from '../Role'

export interface RoleDisable {
  id: string
}

export default getMutation<Role, RoleDisable, AppContext>({
  name: 'RoleDisable',
  outputType: RoleType,
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async ({ id }) =>
    dbTransaction(async connection => {
      await RoleModel.update(
        { isDisabled: true },
        { ...dbOptions, where: { id }, connection }
      )

      return id
    }, dbOptions),
})
