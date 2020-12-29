import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@lambda-middleware/http-error-handler'
import { addProduct } from '../../services/product-service'

export interface Product {
  title: string
  description: string
  price: number
}

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'No body provided with the request',
    }
  }

  const product: Product = JSON.parse(event.body)

  await addProduct(product)

  return {
    statusCode: 201,
    body: JSON.stringify(product),
  }
}

export const handler = errorHandler()(handle)
