import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql'
import { setExtension } from '../setExtension'

describe('setExtension', () => {
  it('set sqlColumn', () => {
    const fields = {
      id: { type: new GraphQLNonNull(GraphQLID) },
      isDisabled: {
        type: new GraphQLNonNull(GraphQLBoolean),
        sqlColumn: 'is_disabled',
        sqlExpr: (table: string) => `UPPER(${table}.last_name)`,
      },
    }

    expect(JSON.stringify(setExtension(fields))).toMatchInlineSnapshot(
      `"{\\"id\\":{\\"type\\":\\"ID!\\"},\\"isDisabled\\":{\\"type\\":\\"Boolean!\\",\\"sqlColumn\\":\\"is_disabled\\",\\"extensions\\":{\\"joinMonster\\":{\\"sqlColumn\\":\\"is_disabled\\"}}}}"`
    )
  })
})
