export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true))

const put = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }))
const get = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }))

export class DocumentClient {
  put = put
  get = get
}
