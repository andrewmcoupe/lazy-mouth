import { userInfo } from 'os'
import { execSync } from 'child_process'

// const stackOutputFilename = 'stack-output.json'
const needToRunServerlessDeploy = !process.env.INTEGRATION_TEST_DEPLOY_STAGE
const deployStage =
  process.env.INTEGRATION_TEST_DEPLOY_STAGE ||
  `local-${userInfo().username.toLowerCase().replace('$', '')}`.substring(0, 16)

// let serviceEndpoint: string | undefined = undefined

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
