export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true))

const put = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }))

export class DocumentClient {
  put = put
}
