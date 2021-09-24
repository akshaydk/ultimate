import HttpError from '../http-error'

describe('Http Error Tests', () => {
  let error: HttpError;
  let expectedMessage = 'Not Found'
  let expectedCode = 404
  
  beforeAll(() => {
    error = new HttpError(expectedCode, expectedMessage)
  })

  it('should be of type reply', () => {
    expect(error).toBeInstanceOf(HttpError)
  });

  it('sets the right error code', () => {
    expect(error.code).toBe(expectedCode)
  })

  it('sets the right error message', () => {
    expect(error.message).toBe(expectedMessage)
  })
});
