import AWS from 'serverless/aws'

export default (): AWS.Resources['Resources'] => ({
  productsTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: "productsTable_${opt:stage, self:provider.stage, 'dev'}",
      AttributeDefinitions: [
        {
          AttributeName: '_id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: '_id',
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
