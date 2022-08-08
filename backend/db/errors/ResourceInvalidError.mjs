export class ResourceInvalidError extends Error {
    static get code() { return 'resource_invalid' }
  
    constructor(message) {
      super(message)
      this.status = 422
      this.code = ResourceInvalidError.code
    }
  }