import AWS from 'serverless/aws'
import databaseResource from './database'

export const getResources = (): AWS.Resources => ({
  Resources: {
    ...databaseResource(),
  },
})
