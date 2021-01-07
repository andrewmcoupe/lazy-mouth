import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { userInfo } from 'os'
import fetch from 'node-fetch'
import { Product } from './add-product'

const stackOutputFilename = 'stack-output.json'
const needToRunServerlessDeploy = !process.env.INTEGRATION_TEST_DEPLOY_STAGE
const deployStage =
  process.env.INTEGRATION_TEST_DEPLOY_STAGE ||
  `local-${userInfo().username.toLowerCase().replace('$', '')}`.substring(0, 16)

describe('ADD PRODUCT INTEGRATION', () => {
  let serviceEndpoint: string

  const deploy = () => {
    if (needToRunServerlessDeploy) {
      const fullServerlessDeployCommand = `npx serverless deploy --stage ${deployStage}`
      console.log(`Running \`${fullServerlessDeployCommand}\`...`)
      execSync(fullServerlessDeployCommand, { stdio: 'inherit' })
    }

    // Deploy stage is set in CI here (process.env.INTEGRATION_TEST_DEPLOY_STAGE)
    const fullServerlessInfoCommand = `npx serverless info --stage ${deployStage}`
    console.log(`Running \`${fullServerlessInfoCommand}\`...`)
    const result = execSync(fullServerlessInfoCommand).toString()
    console.log(result)

    serviceEndpoint = JSON.parse(readFileSync(stackOutputFilename, { encoding: 'utf8' }))['ServiceEndpoint']
  }

  const removeStack = () => {
    if (needToRunServerlessDeploy) {
      const fullServerlessRemoveCommand = `npx serverless remove --stage ${deployStage}`
      console.log(`Running \`${fullServerlessRemoveCommand}\`...`)
      execSync(fullServerlessRemoveCommand, { stdio: 'inherit' })
    }
  }

  beforeAll(() => {
    // deploy integration stack
    deploy()
  })

  afterAll(() => {
    removeStack()
    // remove integration stack
    // handleStack('remove', 'local')
    // remove stack output file
    // unlinkSync(stackOutputFilename)
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
