import axios from 'axios'
import { Product } from './add-product'
import { readFileSync } from 'fs'

const stackOutputFilename = 'stack-output.json'
const serviceEndpoint: string = JSON.parse(readFileSync(stackOutputFilename, { encoding: 'utf8' }))['ServiceEndpoint']

describe('ADD PRODUCT INTEGRATION', () => {
  beforeAll(() => {
    // clear table
  })

  it('should add the product to the DB', async () => {
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

    expect(res.status).toBe(201)
  })
})
