import { errorCodes } from './errors/error-codes.js'
import { InternalServerError } from './errors/InternalServerError.js'

export const handleRequest = async ({ res }, cb) => {
  try {
    await cb()
  } catch (err) {
    sendErrorResponse(res, err)
  }

  res.status(200).end()
}

/** Sends sanitized error response to client */
const sendErrorResponse = (res, error) => {
  const { code } = error

  if (!code || !errorCodes.includes(code)) error = new InternalServerError()
  res.status(error.status || 500).send({ message: error.message, code: error.code })
}
