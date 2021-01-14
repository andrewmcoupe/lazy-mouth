import { v4 as uuidv4 } from 'uuid'
import { addProduct, getProduct, getProducts } from './product-service'
import { Product } from '../handlers/http/add-product/add-product'
import { insertProduct, getProductById, getAllProducts } from '../data-access/product'

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
  describe('getProducts', () => {
    it('should call getProducts()', async () => {
      const mockGetAllProducts = getAllProducts as jest.Mock

      await getProducts()

      expect(mockGetAllProducts).toHaveBeenCalled()
    })

    it('should return an array of products', async () => {
      const stubId1 = uuidv4()
      const stubId2 = uuidv4()
      const stubProducts: Product[] = [
        {
          _id: stubId1,
          title: 'Test product1',
          description: 'Test description1',
          price: 5,
        },
        {
          _id: stubId2,
          title: 'Test product2',
          description: 'Test description2',
          price: 15,
        },
      ]
      const mockGetAllProducts = getAllProducts as jest.Mock
      mockGetAllProducts.mockResolvedValue(stubProducts)

      const result = await getProducts()

      expect(result).toEqual(stubProducts)
    })

    it('should return false if there is an error retrieving product', async () => {
      const mockGetAllProducts = getAllProducts as jest.Mock
      mockGetAllProducts.mockRejectedValue(false)

      const result = await getProducts()

      expect(result).toBe(false)
    })
  })
})
