export class UnauthorizedError extends Error {
    static get code() { return 'unauthorized' }
  
    constructor(message) {
      super(message)
      this.status = 401
      this.code = UnauthorizedError.code
    }
  }