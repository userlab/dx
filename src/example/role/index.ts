export * from './Role'

import createRole from './mutations/createRole'
import disableRole from './mutations/disableRole'
import enableRole from './mutations/enableRole'
import updateRole from './mutations/updateRole'

export const RoleMutation = {
  createRole,
  disableRole,
  enableRole,
  updateRole,
}
