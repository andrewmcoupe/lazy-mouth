import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export interface Product {
  title: string
  description: string
  price: number
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'No body provided with the request',
    }
  }

  const product: Product = JSON.parse(event.body)

  return {
    statusCode: 201,
    body: JSON.stringify(product),
  }
}
