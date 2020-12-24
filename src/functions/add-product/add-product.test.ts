import { handler } from './add-product'
import { stub } from '../../testing/test-helpers'
import { APIGatewayProxyEvent } from 'aws-lambda'

describe('ADD PRODUCT', () => {
  it('should return a 400 if a body is not provided in the request', async () => {
    const stubEvent = stub<APIGatewayProxyEvent>({ body: null })
    const res = await handler(stubEvent)

    expect(res.statusCode).toBe(400)
  })
})
