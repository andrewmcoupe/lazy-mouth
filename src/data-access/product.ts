import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Product } from '../functions/add-product/add-product'

const dynamoDb = new DocumentClient()

export const insertProduct = async (product: Product) => {
  return await dynamoDb
    .put({ Item: product, TableName: process.env.PRODUCTS_TABLE_NAME as string, ReturnValues: 'ALL_OLD' })
    .promise()
}
