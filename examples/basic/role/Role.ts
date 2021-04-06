import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { v4 as uuid } from 'uuid'
import { getQuery, FieldConfigMap } from '@userlab/dx'
import { UserType } from '../user'

export interface Role {
  id: string
  name: string
  description?: string
  isDisabled: boolean
}

export interface RoleCreate {
  name: string
  description?: string
}

const fields = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    defaultValue: uuid,
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  description: {
    type: GraphQLString,
  },
  isDisabled: {
    type: new GraphQLNonNull(GraphQLBoolean),
    sqlColumn: 'is_disabled',
    defaultValue: false,
  },
} as FieldConfigMap

const relations = (): FieldConfigMap => ({
  users: {
    type: new GraphQLList(UserType),
    sqlJoin: (role: string, user: string) => `${role}.id = ${user}.role_id`,
  },
})

const {
  objectType: RoleType,
  model: RoleModel,
  get: role,
  connection: roles,
} = getQuery<Role, RoleCreate>({
  name: 'Role',
  table: 'role',
  uniqueKey: 'id',
  fields,
  relations,
})

export { RoleType, RoleModel }
export const RoleQuery = { role, roles }
