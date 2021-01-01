import { v4 as uuidv4 } from 'uuid'
import { insertProduct } from './product'
import { Product } from '../functions/add-product/add-product'
import { DocumentClient, awsSdkPromiseResponse } from '../../__mocks__/aws-sdk/clients/dynamodb'

describe('DATA ACCESS', () => {
  describe('insertProduct()', () => {
    const stubProduct: Product = {
      _id: uuidv4(),
      price: 5,
      title: 'Test title',
      description: 'Test description',
    }

    it('should call put() with the correct arguments', async () => {
      const client = new DocumentClient()
      const stubParams = {
        Item: stubProduct,
        TableName: process.env.PRODUCTS_TABLE_NAME,
        ReturnValues: 'ALL_OLD',
      }

      await insertProduct(stubProduct)

      expect(client.put).toHaveBeenCalledWith(stubParams)
    })

    it('should return inserted product after inserting product into DB', async () => {
      awsSdkPromiseResponse.mockReturnValueOnce({ Attributes: stubProduct })

      const res = await insertProduct(stubProduct)

      expect(res).toEqual({ Attributes: stubProduct })
    })
  })
})
