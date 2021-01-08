import { v4 as uuidv4 } from 'uuid'
import { insertProduct, getProductById } from './product'
import { Product } from '../handlers/http/add-product/add-product'
import { DocumentClient, awsSdkPromiseResponse } from '../../__mocks__/aws-sdk/clients/dynamodb'

describe('DATA ACCESS', () => {
  const stubProduct: Product = {
    _id: uuidv4(),
    price: 5,
    title: 'Test title',
    description: 'Test description',
  }

  describe('insertProduct()', () => {
    it('should call put() with the correct arguments', async () => {
      const client = new DocumentClient()
      const stubParams = {
        Item: stubProduct,
        TableName: process.env.PRODUCTS_TABLE_NAME,
      }

      await insertProduct(stubProduct)

      expect(client.put).toHaveBeenCalledWith(stubParams)
    })

    it('should return empty object after inserting product into DB', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce({})

      const res = await insertProduct(stubProduct)

      expect(res).toEqual(stubProduct)
    })
  })

  describe('getProductById()', () => {
    it('should call get() with the correct arguments', async () => {
      const client = new DocumentClient()
      const stubParams = {
        Key: { _id: stubProduct._id },
        TableName: process.env.PRODUCTS_TABLE_NAME,
      }

      await getProductById(stubProduct._id!)

      expect(client.get).toHaveBeenCalledWith(stubParams)
    })

    it('should return the retrieved product from the DB', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce({ Item: stubProduct })

      const res = await getProductById(stubProduct._id!)

      expect(res).toEqual(stubProduct)
    })
  })
})
