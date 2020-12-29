import { handler, Product } from './add-product'
import { stub } from '../../testing/test-helpers'
import { APIGatewayProxyEvent } from 'aws-lambda'

describe('ADD PRODUCT', () => {
  it('should return a 400 if a body is not provided in the request', async () => {
    const stubEvent = stub<APIGatewayProxyEvent>({ body: null })
    const res = await handler(stubEvent)

    expect(res.statusCode).toBe(400)
  })

  it('should return a 200 if a valid body is provided in the request', async () => {
    const stubBody: Product = {
      title: 'Test title',
      description: 'Test description',
      price: 5,
    }
    const stubEvent = stub<APIGatewayProxyEvent>({ body: JSON.stringify(stubBody) })
    const res = await handler(stubEvent)

    expect(res.statusCode).toBe(201)
  })
})
