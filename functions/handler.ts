import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

export const hello: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    body: 'hello lazy mouth',
  }
}
