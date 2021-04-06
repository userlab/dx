export * from './User'

import createUser from './mutations/createUser'
import updateUser from './mutations/updateUser'

export const UserMutation = {
  createUser,
  updateUser,
}
