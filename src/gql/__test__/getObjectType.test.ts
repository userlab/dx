import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql'
import { getObjectType } from '../getObjectType'

describe('getObjectType', () => {
  it('create object type', () => {
    const objectType = getObjectType({
      name: 'Test',
      table: 'test',
      uniqueKey: 'id',
      fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        isDisabled: {
          type: new GraphQLNonNull(GraphQLBoolean),
          sqlColumn: 'is_disabled',
        },
      },
    })

    expect(JSON.stringify(objectType)).toMatchInlineSnapshot(`"\\"Test\\""`)
  })
})
