import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Product } from '../handlers/http/add-product/add-product'

const dynamoDb = new DocumentClient()
const productsTableName = process.env.PRODUCTS_TABLE_NAME as string

export const insertProduct = async (product: Product) => {
  await dynamoDb.put({ Item: product, TableName: productsTableName }).promise()
  return product
}

export const getProductById = async (id: string) => {
  const res = await dynamoDb.get({ Key: { _id: id }, TableName: productsTableName }).promise()
  return res.Item as Product
}
