import axios from 'axios'
import { Product } from '../add-product/add-product'
import { readFileSync } from 'fs'

const stackOutputFilename = 'stack-output.json'
const serviceEndpoint: string = JSON.parse(readFileSync(stackOutputFilename, { encoding: 'utf8' }))['ServiceEndpoint']
let insertedProduct: Product = {} as Product

describe('GET PRODUCT INTEGRATION', () => {
  beforeAll(async () => {
    const stubBody: Product = {
      title: 'Test title',
      description: 'Test description',
      price: 5,
    }
    // call endpoint
    const res = await axios(`${serviceEndpoint}/products`, {
      method: 'post',
      data: stubBody,
    })

    insertedProduct = res.data
  })

  it('should return 200 requesting a product by ID', async () => {
    console.log(insertedProduct)
    const res = await axios(`${serviceEndpoint}/products/${insertedProduct._id}`)
    expect(res.status).toBe(200)
    expect(res.data).toEqual(insertedProduct)
  })
})
