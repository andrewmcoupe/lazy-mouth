import { Serverless } from 'serverless/aws'
import { getResources } from './serverless-config/resources'
import { getFunctions } from './serverless-config/functions'
import { getProvider } from './serverless-config/provider'
import { packageConfig } from './serverless-config/package'
import { customConfig } from './serverless-config/custom'
import { pluginConfig } from './serverless-config/plugins'

const serviceName = 'lazy-mouth'

const serverlessConfiguration: Serverless = {
  service: serviceName,
  frameworkVersion: '>=1.72.0',
  custom: customConfig,
  package: packageConfig,
  plugins: pluginConfig,
  provider: getProvider(),
  resources: getResources(),
  functions: getFunctions(),
}

module.exports = serverlessConfiguration
