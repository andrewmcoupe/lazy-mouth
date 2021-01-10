import { userInfo } from 'os'
import { execSync } from 'child_process'

const deployStage =
  process.env.INTEGRATION_TEST_DEPLOY_STAGE ||
  `local-${userInfo().username.toLowerCase().replace('$', '')}`.substring(0, 16)

const fullServerlessDeployCommand = `npx serverless remove --stage ${deployStage}`
console.log(`Running \`${fullServerlessDeployCommand}\`...`)
execSync(fullServerlessDeployCommand, { stdio: 'inherit' })
