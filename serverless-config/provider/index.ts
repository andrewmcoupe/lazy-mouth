import AWS from 'serverless/aws'

export const getProvider = (): AWS.Provider => ({
  name: 'aws',
  region: 'eu-west-1',
  runtime: 'nodejs12.x',
  apiGateway: {
    minimumCompressionSize: 1024,
  },
  environment: {
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:PutItem', 'dynamodb:GetItem'],
      Resource: "arn:aws:dynamodb:eu-west-1:426272767687::table/productsTable_${opt:stage, self:provider.stage, 'dev'}",
    },
  ],
})
