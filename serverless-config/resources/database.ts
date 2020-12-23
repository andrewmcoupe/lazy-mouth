import AWS from 'serverless/aws'

export default (): AWS.Resources['Resources'] => ({
  creationsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: "creationsTable_${opt:stage, self:provider.stage, 'dev'}",
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
  customersTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: "customersTable_${opt:stage, self:provider.stage, 'dev'}",
      AttributeDefinitions: [
        {
          AttributeName: 'email',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'email',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  },
})
