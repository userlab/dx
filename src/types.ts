import {
  GraphQLEnumType,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLResolveInfo,
} from 'graphql'
import { FieldConfigExtension } from 'join-monster'
import { Client } from 'pg'

export interface FieldConfig
  extends GraphQLFieldConfig<any, any>,
    FieldConfigExtension<any, any, any> {
  defaultValue?: any
}

export interface FieldConfigMap {
  [key: string]: FieldConfig
}

export interface getConnectionConfig {
  connectionType: GraphQLObjectType
  orderByType: GraphQLEnumType
  whereType: GraphQLInputObjectType
  fields: FieldConfigMap
  uniqueKey: string | string[]
  defaultOrderBy?: string[]
}

export interface DxArgs {
  name: string
  description?: string
  table: string
  uniqueKey: string | string[]
  fields: FieldConfigMap
  relations?: () => FieldConfigMap
  defaultOrderBy?: string[]
}

export interface DxReturn<TObject, TCreateObject> {
  objectType: GraphQLObjectType
  get: GraphQLFieldConfig<any, any>
  orderByType: GraphQLEnumType
  whereType: GraphQLInputObjectType
  connectionType: GraphQLObjectType
  connection: GraphQLFieldConfig<any, any>
  model: Model<TObject, TCreateObject>
}

export interface DBConfig {
  host: string
  port: number
  database: string
  user: string
  passowrd: string
}

export interface DBOptions {
  connection?: Client
  dbConfig?: DBConfig
  dbLogging?: (sql: string, params: any) => void
  where?: { [key: string]: unknown }
}

export interface Model<TObject, TCreateObject> {
  create: (values: TCreateObject, options: DBOptions) => Promise<TObject>
  update: (values: Partial<TObject>, options: DBOptions) => Promise<void>
}

// Mutation

export interface MutationConfig<TInput, TContext = any> {
  name: string
  description?: string
  outputType: GraphQLObjectType
  inputFields: GraphQLInputFieldConfigMap
  resolve: (input: TInput, context: TContext) => Promise<string>
}

export interface Mutation<TReturn, TInput>
  extends GraphQLFieldConfig<any, any> {
  type: GraphQLObjectType
  description?: string
  args: GraphQLFieldConfigArgumentMap
  extensions: {
    joinMonster: {
      where: (table: string, args: any, context: any) => string
    }
  }
  resolve: (
    root: unknown,
    args: { input?: TInput },
    context: any,
    resolveInfo: GraphQLResolveInfo
  ) => Promise<TReturn>
}
