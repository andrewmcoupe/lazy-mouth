import AWS from 'serverless/aws'
export const customConfig: AWS.Custom = {
  webpack: {
    webpackConfig: './webpack.config.js',
    includeModules: true,
  },
}
