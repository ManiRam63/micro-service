import { Request, Response, NextFunction } from 'express'
import Jwt from 'jsonwebtoken'
import logger from '../logger/logger'
import { ResponseMessage } from '../utils/responseMessage'
import mongoose from 'mongoose'
import { errorResponse } from '../handler/responseHandler'
import { STATUSCODE } from '../utils/statusCode'
const filename: string = ' - index.ts'
/**
 * @description: This function is used to validate the token
 * @param req
 * @param res
 * @param next
 */
export function auth(req: any, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new Error(ResponseMessage.AUTH.INVALID_CREDENTIALS)
    }
    const decodedToken: any = Jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || '',
    )
    const userId: mongoose.Types.ObjectId = decodedToken.user?._id
    if (!userId) {
      return errorResponse(
        res,
        ResponseMessage.AUTH.USER_NOT_FOUND,
        STATUSCODE.NotFound,
      )
    } else {
      req.user = decodedToken?.user
      next()
    }
  } catch (error) {
    logger.error(ResponseMessage.AUTH.INVALID_TOKEN + filename, {
      meta: error,
    })
    return errorResponse(
      res,
      ResponseMessage.AUTH.INVALID_TOKEN,
      STATUSCODE.InternalServerError,
    )
  }
}
/**
 * @description this function is used to validate the id
 * @param req
 * @param res
 * @param next
 */
export function validateId(req: Request, res: Response, next: NextFunction) {
  try {
    const isValid = mongoose.Types.ObjectId.isValid(req?.params?.id)
    if (!isValid) {
      logger.error(ResponseMessage.USER.INVALID_ID + filename, {
        meta: ResponseMessage.USER.INVALID_ID,
      })
      return errorResponse(
        res,
        ResponseMessage.USER.INVALID_ID,
        STATUSCODE.BadRequest,
      )
    } else {
      next()
    }
  } catch (error) {
    logger.error(ResponseMessage.USER.INVALID_ID + filename, {
      meta: error,
    })
    return errorResponse(
      res,
      ResponseMessage.USER.INVALID_ID,
      STATUSCODE.BadRequest,
    )
  }
}
