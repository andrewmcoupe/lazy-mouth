import { addProduct } from './product-service'
import { Product } from '../functions/add-product/add-product'
import { insertProduct } from '../data-access/product'

jest.mock('../data-access/product')

describe('PRODUCT SERVICE', () => {
  describe('addProduct', () => {
    const stubProduct: Product = {
      title: 'Test title',
      description: 'Test description',
      price: 10,
    }

    it('should call insertProduct with the correct arguments', async () => {
      const mockInsertProduct = insertProduct as jest.Mock

      await addProduct(stubProduct)

      expect(mockInsertProduct).toHaveBeenCalledWith(expect.objectContaining(stubProduct))
    })

    it('should return true on successfully inserting a product', async () => {
      const mockInsertProduct = insertProduct as jest.Mock
      mockInsertProduct.mockResolvedValue(true)

      const result = await addProduct(stubProduct)

      expect(result).toBe(true)
    })

    it('should return false if there is an error inserting product', async () => {
      const mockInsertProduct = insertProduct as jest.Mock
      mockInsertProduct.mockRejectedValue(false)

      const result = await addProduct(stubProduct)

      expect(result).toBe(false)
    })
  })
})
