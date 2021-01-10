import { userInfo } from 'os'
import { execSync } from 'child_process'

enum Action {
  deploy = 'deploy',
  remove = 'remove',
}

const action: string | undefined = process.argv.find((arg: string) => {
  if (arg.includes('deploy=true')) {
    return Action.deploy
  } else if (arg.includes('remove=true')) {
    return Action.remove
  }
})

const deployStage =
  process.env.INTEGRATION_TEST_DEPLOY_STAGE ||
  `local-${userInfo().username.toLowerCase().replace('$', '')}`.substring(0, 16)

const fullServerlessDeployCommand = `npx serverless ${action} --stage ${deployStage}`
console.log(`Running \`${fullServerlessDeployCommand}\`...`)
execSync(fullServerlessDeployCommand, { stdio: 'inherit' })
