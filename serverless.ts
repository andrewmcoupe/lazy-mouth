import { Serverless } from 'serverless/aws'

const serverlessConfiguration: Serverless = {
  service: {
    name: 'lazy-mouth',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  resources: {
    Resources: {
      creationsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: "creations_${opt:stage, self:provider.stage, 'dev'}",
          AttributeDefinitions: [
            {
              AttributeName: 'title',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'title',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
  functions: {
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
  },
}

module.exports = serverlessConfiguration
