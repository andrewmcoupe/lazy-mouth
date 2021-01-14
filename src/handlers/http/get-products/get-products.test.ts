import { v4 as uuidv4 } from 'uuid'
import { handler } from './get-products'
import { stub } from '../../../testing/test-helpers'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { getProducts } from '../../../services/product-service'
import { Product } from '../add-product/add-product'

jest.mock('../../../services/product-service')

describe('GET ALL PRODUCTS', () => {
  it('should call getProducts() with no arguments', async () => {
    const stubGetProducts = getProducts as jest.Mock
    const stubEvent = stub<APIGatewayProxyEvent>({})

    await handler(stubEvent, {} as Context)

    expect(stubGetProducts).toHaveBeenCalled()
  })

  it('should return a 500 if getProduct() throws', async () => {
    const stubGetProducts = getProducts as jest.Mock
    stubGetProducts.mockRejectedValue(new Error())
    const stubEvent = stub<APIGatewayProxyEvent>({})

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(500)
  })

  it('should return a 200 with a list of products', async () => {
    const stubProducts: Product[] = [
      {
        _id: uuidv4(),
        title: 'Test product 1',
        description: 'Test description 1',
        price: 5,
      },
      {
        _id: uuidv4(),
        title: 'Test product 2',
        description: 'Test description 2',
        price: 15,
      },
    ]
    const stubGetProducts = getProducts as jest.Mock
    stubGetProducts.mockResolvedValue(stubProducts)
    const stubEvent = stub<APIGatewayProxyEvent>({})

    const res = await handler(stubEvent, {} as Context)

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(JSON.stringify(stubProducts))
  })
})
