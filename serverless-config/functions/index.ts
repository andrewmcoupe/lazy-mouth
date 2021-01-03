import AWS from 'serverless/aws'
import { addProductSchema } from '../validation-schema/add-product'

export const getFunctions = (): AWS.Functions => ({
  addProduct: {
    environment: {
      PRODUCTS_TABLE_NAME: "creationsTable_${opt:stage, self:provider.stage, 'dev'}",
    },
    handler: 'src/functions/add-product/add-product.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/products',
          request: {
            schema: {
              'application/json': addProductSchema,
            },
          },
        },
      },
    ],
  },
})
