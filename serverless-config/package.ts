import AWS from 'serverless/aws'

export const packageConfig: AWS.Package = {
  individually: true,
  exclude: ['./**', '!package.json'],
}
