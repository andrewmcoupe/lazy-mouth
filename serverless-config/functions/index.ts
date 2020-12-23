import AWS from 'serverless/aws'

export const getFunctions = (): AWS.Functions => ({
  hello: {
    handler: 'src/functions/handler.hello',
    events: [
      {
        http: {
          method: 'get',
          path: 'hello',
        },
      },
    ],
  },
})
