import { APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@lambda-middleware/http-error-handler'
import { getProducts } from '../../../services/product-service'

export const handle = async (): Promise<APIGatewayProxyResult> => {
  const products = await getProducts()

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  }
}

export const handler = errorHandler()(handle)
