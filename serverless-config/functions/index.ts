import AWS from 'serverless/aws'

export const getFunctions = (): AWS.Functions => ({
  addProduct: {
    handler: 'src/functions/add-product/add-product.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/products',
        },
      },
    ],
  },
})
