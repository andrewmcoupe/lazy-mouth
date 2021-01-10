import { handler, Product } from './add-product'
import { stub } from '../../../testing/test-helpers'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { addProduct } from '../../../services/product-service'

jest.mock('../../../services/product-service')
console.log(process.env)
const stubBody: Product = {
  title: 'Test title',
  description: 'Test description',
  price: 5,
}

describe('ADD PRODUCT', () => {
  it('should return a 400 if a body is not provided in the request', async () => {
    const stubEvent = stub<APIGatewayProxyEvent>({ body: null })
    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(400)
  })

  it('should call addProduct with the correct arguments', async () => {
    const mockAddProduct = addProduct as jest.Mock
    const stubEvent = stub<APIGatewayProxyEvent>({ body: JSON.stringify(stubBody) })

    await handler(stubEvent, {} as Context)

    expect(mockAddProduct).toHaveBeenCalledWith(stubBody)
  })

  it('should return a 500 if addProduct from product service throws', async () => {
    const mockAddProduct = addProduct as jest.Mock
    mockAddProduct.mockRejectedValue(new Error())
    const stubEvent = stub<APIGatewayProxyEvent>({ body: JSON.stringify(stubBody) })

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(500)
  })

  it('should return a 201 if product is successfully created', async () => {
    const mockAddProduct = addProduct as jest.Mock
    mockAddProduct.mockResolvedValue(true)
    const stubEvent = stub<APIGatewayProxyEvent>({ body: JSON.stringify(stubBody) })

    const res = await handler(stubEvent, {} as Context)
    expect(res.statusCode).toBe(201)
  })
})
