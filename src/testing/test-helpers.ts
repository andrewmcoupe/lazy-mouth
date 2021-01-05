import { execSync } from 'child_process'

export const stub = <T>(obj: Partial<T>) => {
  return obj as T
}

export const handleStack = (action: 'deploy' | 'remove', stage: 'prod' | 'dev' | 'integration') => {
  execSync(`npx serverless ${action} --stage ${stage}`, { encoding: 'utf8' })
}
