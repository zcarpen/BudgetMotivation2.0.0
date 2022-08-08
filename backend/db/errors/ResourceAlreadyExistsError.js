export class ResourceAlreadyExistsError extends Error {
    static get code() { return 'resource_already_exists' }
  
    constructor(message) {
      super(message)
      this.status = 422
      this.code = ResourceAlreadyExistsError.code
    }
  }