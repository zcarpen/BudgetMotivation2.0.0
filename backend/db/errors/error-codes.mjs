import { InternalServerError } from './InternalServerError.mjs'
import { ResourceAlreadyExistsError } from './ResourceAlreadyExistsError.js'
import { ResourceInvalidError } from './ResourceInvalidError.mjs'
import { ResourceNotFoundError } from './ResourceNotFoundError.mjs'
import { UnauthorizedError } from './UnauthorizedError.mjs'

export const errorCodes = [
  InternalServerError.code,
  ResourceAlreadyExistsError.code,
  ResourceInvalidError.code,
  ResourceNotFoundError.code,
  UnauthorizedError.code
]