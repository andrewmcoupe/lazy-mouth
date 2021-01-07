import { readFileSync } from 'fs'
import fetch from 'node-fetch'
// import { handleStack } from '../../../testing/test-helpers'
import { Product } from '../add-product/add-product'

const stackOutputFilename = 'stack-output.json'
// const stage = 'integration'

describe('GET PRODUCT INTEGRATION', () => {
  let serviceEndpoint: string
  let insertedProduct: Product = {} as Product

  beforeAll(async () => {
    // deploy integration stack
    // handleStack('deploy', stage)
    serviceEndpoint = JSON.parse(readFileSync(stackOutputFilename, 'utf8'))['ServiceEndpoint']

    const stubBody: Product = {
      title: 'Test title',
      description: 'Test description',
      price: 5,
    }

    // add a product so we can perform get request
    const res = await fetch(`${serviceEndpoint}/products`, {
      method: 'post',
      body: JSON.stringify(stubBody),
    })
    insertedProduct = await res.json()
  })

  afterAll(() => {
    // remove integration stack
    // handleStack('remove', stage)
    // remove stack output file
    // unlinkSync(stackOutputFilename)
  })

  it('should return 200 requesting a product by ID', async () => {
    const res = await fetch(`${serviceEndpoint}/products/${insertedProduct._id}`)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json).toEqual(insertedProduct)
  })
})
