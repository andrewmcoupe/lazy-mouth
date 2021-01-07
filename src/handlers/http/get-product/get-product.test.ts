import { v4 as uuidv4 } from 'uuid'
import { handler } from './get-product'
import { stub } from '../../../testing/test-helpers'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { getProduct } from '../../../services/product-service'
import { Product } from '../add-product/add-product'

console.log(process.env.ANDY)
jest.mock('../../../services/product-service')

describe('GET PRODUCT', () => {
  it('should return a 400 if ID path parameter is not provided in request URL', async () => {
    const stubEvent = stub<APIGatewayProxyEvent>({
      pathParameters: {
        id: '',
      },
    })
    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(400)
  })

  it('should call getProduct() with the correct arguments', async () => {
    const stubGetProduct = getProduct as jest.Mock
    const stubId = uuidv4()
    const stubEvent = stub<APIGatewayProxyEvent>({
      pathParameters: {
        id: stubId,
      },
    })

    await handler(stubEvent, {} as Context)

    expect(stubGetProduct).toHaveBeenCalledWith(stubId)
  })

  it('should return a 500 if getProduct() throws', async () => {
    const stubGetProduct = getProduct as jest.Mock
    stubGetProduct.mockRejectedValue(new Error())
    const stubEvent = stub<APIGatewayProxyEvent>({
      pathParameters: {
        id: uuidv4(),
      },
    })

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(500)
  })

  it('should return a 404 if product not found', async () => {
    const stubGetProduct = getProduct as jest.Mock
    stubGetProduct.mockResolvedValue(false)
    const stubEvent = stub<APIGatewayProxyEvent>({
      pathParameters: {
        id: uuidv4(),
      },
    })

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(404)
  })

  it('should return a 200 with product info when product found', async () => {
    const stubProduct: Product = {
      _id: uuidv4(),
      title: 'Test product',
      description: 'Test description',
      price: 5,
    }
    const stubGetProduct = getProduct as jest.Mock
    stubGetProduct.mockResolvedValue(stubProduct)
    const stubEvent = stub<APIGatewayProxyEvent>({
      pathParameters: {
        id: uuidv4(),
      },
    })

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(JSON.stringify(stubProduct))
  })
})
