import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import { v4 as uuid } from 'uuid'
import { getQuery } from '../../index'
import { FieldConfigMap } from '../../types'
import { RoleType } from '../role'

export interface User {
  id: string
  name: string
  roleId: string
  isDisabled: boolean
}

export interface UserCreate {
  name: string
  roleId: string
}

const fields = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
    defaultValue: uuid,
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  roleId: {
    type: GraphQLID,
    sqlColumn: 'role_id',
  },
  isDisabled: {
    type: new GraphQLNonNull(GraphQLBoolean),
    sqlColumn: 'is_disabled',
    defaultValue: false,
  },
} as FieldConfigMap

const relations = (): FieldConfigMap => ({
  role: {
    type: RoleType,
    sqlJoin: (user: string, role: string) => `${user}.role_id = ${role}.id`,
  },
})

const {
  objectType: UserType,
  model: UserModel,
  get: user,
  connection: users,
} = getQuery<User, UserCreate>({
  name: 'User',
  table: 'sys_user',
  uniqueKey: 'id',
  fields,
  relations,
})

export { UserType, UserModel }
export const UserQuery = { user, users }
