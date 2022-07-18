import { InternalServerError } from './InternalServerError'
import { ResourceAlreadyExistsError } from './ResourceAlreadyExistsError'
import { ResourceInvalidError } from './ResourceInvalidError'
import { ResourceNotFoundError } from './ResourceNotFoundError'
import { UnauthorizedError } from './UnauthorizedError'

export const errorCodes = [
  InternalServerError.code,
  ResourceAlreadyExistsError.code,
  ResourceInvalidError.code,
  ResourceNotFoundError.code,
  UnauthorizedError.code
]
