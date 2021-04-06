import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { getMutation, dbTransaction } from '../../../index'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { User, UserModel, UserType } from '../User'

export interface UserUpdate {
  id: string
  name: string
  roleId: string
}

export default getMutation<User, UserUpdate, AppContext>({
  name: 'UserUpdate',
  outputType: UserType,
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    roleId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async ({ id, ...input }) =>
    dbTransaction(async connection => {
      await UserModel.update(input, { ...dbOptions, where: { id }, connection })

      return id
    }, dbOptions),
})
