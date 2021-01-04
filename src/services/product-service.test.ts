import { v4 as uuidv4 } from 'uuid'
import { addProduct, getProduct } from './product-service'
import { Product } from '../functions/add-product/add-product'
import { insertProduct, getProductById } from '../data-access/product'

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
  describe('getProduct', () => {
    it('should call getProductById() with the correct arguments', async () => {
      const stubId = uuidv4()
      const mockGetProductById = getProductById as jest.Mock

      await getProduct(stubId)

      expect(mockGetProductById).toHaveBeenCalledWith(stubId)
    })

    it('should return the product with the matching ID', async () => {
      const stubId = uuidv4()
      const stubProduct: Product = {
        _id: stubId,
        title: 'Test product',
        description: 'Test description',
        price: 5,
      }
      const mockGetProductById = getProductById as jest.Mock
      mockGetProductById.mockResolvedValue(stubProduct)

      const result = await getProduct(stubProduct._id!)

      expect(result).toEqual(stubProduct)
    })

    it('should return false if there is an error retrieving product', async () => {
      const stubId = uuidv4()
      const mockGetProductById = getProductById as jest.Mock
      mockGetProductById.mockRejectedValue(false)

      const result = await getProduct(stubId)

      expect(result).toBe(false)
    })
  })
})
