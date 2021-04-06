import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql'
import { getMutation, dbTransaction } from '@userlab/dx'
import { dbOptions } from '../../constants'
import { AppContext } from '../../types'
import { User, UserCreate, UserModel, UserType } from '../User'

export default getMutation<User, UserCreate, AppContext>({
  name: 'UserCreate',
  outputType: UserType,
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    roleId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async input =>
    dbTransaction(async connection => {
      const user = await UserModel.create(input, { ...dbOptions, connection })

      return user.id
    }, dbOptions),
})
