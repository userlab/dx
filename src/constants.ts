import { GraphQLInputType, GraphQLList, GraphQLString } from 'graphql'

export enum Operator {
  eq = 'eq',
  ne = 'ne',
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  is = 'is',
  not = 'not',
  in = 'in',
  notIn = 'notIn',
  like = 'like',
  notLike = 'notLike',
  iLike = 'iLike',
  insub = 'insub',
}

export const operators = {
  eq: { type: GraphQLString, sql: '=' },
  ne: { type: GraphQLString, sql: '!=' },
  gt: { type: GraphQLString, sql: '>' },
  gte: { type: GraphQLString, sql: '>=' },
  lt: { type: GraphQLString, sql: '<' },
  lte: { type: GraphQLString, sql: '<=' },
  is: { type: GraphQLString, sql: 'IS' },
  not: { type: GraphQLString, sql: 'IS NOT' },
  in: { type: new GraphQLList(GraphQLString), sql: 'IN' },
  notIn: { type: new GraphQLList(GraphQLString), sql: 'NOT IN' },
  like: { type: GraphQLString, sql: 'LIKE' },
  notLike: { type: GraphQLString, sql: 'NOT LIKE' },
  iLike: { type: GraphQLString, sql: 'ILIKE' },
  insub: { type: GraphQLString, sql: 'IN' },
} as {
  [key in Operator]: { type: GraphQLInputType; sql: string }
}
