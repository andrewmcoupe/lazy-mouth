import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { errorHandler } from '@lambda-middleware/http-error-handler'
import { getProduct } from '../../../services/product-service'

export const handle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters?.id) {
    return {
      statusCode: 400,
      body: 'Path parameter <id> must be provided',
    }
  }

  const product = await getProduct(event.pathParameters.id)

  if (!product) {
    return {
      statusCode: 404,
      body: 'Product not found',
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  }
}

export const handler = errorHandler()(handle)
