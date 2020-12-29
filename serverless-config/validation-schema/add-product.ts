export const addProductSchema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  title: 'Adding a product',
  required: ['title', 'description', 'price'],
  properties: {
    title: {
      type: 'string',
      title: 'A Product Title',
    },
    description: {
      type: 'string',
      title: 'A Product description which describes a product',
    },
    price: {
      type: 'integer',
      title: 'The price for a product',
    },
  },
}
