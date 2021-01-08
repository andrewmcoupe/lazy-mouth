import { execSync } from 'child_process'
import { userInfo } from 'os'
import { readFileSync } from 'fs'

export const stub = <T>(obj: Partial<T>) => {
  return obj as T
}

export const handleStack = () => {
  const stackOutputFilename = 'stack-output.json'
  const needToRunServerlessDeploy = !process.env.INTEGRATION_TEST_DEPLOY_STAGE
  const deployStage =
    process.env.INTEGRATION_TEST_DEPLOY_STAGE ||
    `local-${userInfo().username.toLowerCase().replace('$', '')}`.substring(0, 16)

  // let serviceEndpoint: string | undefined = undefined

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

    const serviceEndpoint: string = JSON.parse(readFileSync(stackOutputFilename, { encoding: 'utf8' }))[
      'ServiceEndpoint'
    ]

    return serviceEndpoint
  }

  const removeStack = () => {
    if (needToRunServerlessDeploy) {
      const fullServerlessRemoveCommand = `npx serverless remove --stage ${deployStage}`
      console.log(`Running \`${fullServerlessRemoveCommand}\`...`)
      execSync(fullServerlessRemoveCommand, { stdio: 'inherit' })
    }
  }

  return {
    removeStack,
    deploy,
    // serviceEndpoint,
  }
}
