import { readFileSync, unlinkSync } from 'fs'
import fetch from 'node-fetch'
import { handleStack } from '../../testing/test-helpers'
import { Product } from './add-product'

const stackOutputFilename = 'stack-output.json'
const stage = 'integration'

describe('ADD PRODUCT INTEGRATION', () => {
  let serviceEndpoint: string

  beforeAll(() => {
    // deploy integration stack
    handleStack('deploy', stage)
    serviceEndpoint = JSON.parse(readFileSync(stackOutputFilename, 'utf8'))['ServiceEndpoint']
  })

  afterAll(() => {
    // remove integration stack
    handleStack('remove', stage)
    // remove stack output file
    unlinkSync(stackOutputFilename)
  })
  it('should add the product to the DB', async () => {
    const stubBody: Product = {
      title: 'Test title',
      description: 'Test description',
      price: 5,
    }

    // call endpoint
    const res = await fetch(`${serviceEndpoint}/products`, {
      method: 'post',
      body: JSON.stringify(stubBody),
    })

    expect(res.status).toBe(201)
  })
})
