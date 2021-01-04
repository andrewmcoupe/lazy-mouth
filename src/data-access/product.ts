import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Product } from '../functions/add-product/add-product'

const dynamoDb = new DocumentClient()
const productsTableName = process.env.PRODUCTS_TABLE_NAME as string

export const insertProduct = async (product: Product) => {
  return await dynamoDb.put({ Item: product, TableName: productsTableName, ReturnValues: 'ALL_OLD' }).promise()
}

export const getProductById = async (id: string) => {
  const res = await dynamoDb.get({ Key: { _id: id }, TableName: productsTableName }).promise()
  return res.Item as Product
}
