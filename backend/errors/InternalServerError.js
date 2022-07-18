export class InternalServerError extends Error {
  static get code() { return 'internal_server_error' }

  constructor() {
    super('Something went wrong')
    this.status = 500
    this.code = InternalServerError.code
  }
}
