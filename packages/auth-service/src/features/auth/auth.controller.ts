import logger from '../../logger/logger'
import { errorResponse, successResponse } from '../../handler/responseHandler'
import { ResponseMessage } from '../../../../common/utils/responseMessage'
import { STATUSCODE } from '../../../../common/utils/statusCode'
import { loginSchema } from './auth.schema'
import { Request, Response } from 'express'
import AuthService from './auth.service'
const filename: string = ' :- in auth.controller.js'
const responseMessage = ResponseMessage.AUTH
const AuthController = {
  /**
   * @description : This function is used to signIn user
   * @param req
   * @param res
   * @returns
   */
  signIn: async (req: Request, res: Response): Promise<void> => {
    try {
      const { body } = req
      const validateResult = loginSchema.validate(body)
      if (validateResult.error) {
        const errorMessage = validateResult.error.message
        errorResponse(res, errorMessage, STATUSCODE.BadRequest)
      }
      const result = await AuthService.signIn(body)
      if (result?.error) {
        const message = result?.error || responseMessage.SOME_ERROR_OCCURRED
        logger.error(`${message} ${filename}`, {
          meta: result?.error,
        })
        errorResponse(res, message, STATUSCODE.InternalServerError)
      }
      successResponse(
        res,
        responseMessage.LOGIN_SUCCESSFULLY,
        STATUSCODE.OK,
        result.result,
      )
    } catch (error) {
      logger.error(`${error.message} ${filename}`, {
        meta: error,
      })
      errorResponse(res, error.message, STATUSCODE.InternalServerError)
    }
  },
}
export default AuthController
