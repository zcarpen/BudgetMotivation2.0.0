export class ResourceNotFoundError extends Error {
    static get code() { return 'resource_not_found' }
  
    constructor(message) {
      super(message)
      this.status = 404
      this.code = ResourceNotFoundError.code
    }
  }