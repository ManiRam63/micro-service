import { ResponseMessage } from '../../../../common/utils/responseMessage';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../../../../common/logger/logger';
import { IUser, IUserRes } from '../../interface/IUser';
import mongoose from 'mongoose';
import client from '../../grpc-client';
const responseMessage = ResponseMessage.AUTH;
const filename: string = 'auth.service.js';
const AuthService = {
  /**
   * @description: This function is used to sign in the user
   * @param : email , password
   * @returns user data with token
   */
  signIn: async (data: { email: string; password: string }): Promise<{ error?: string; result?: IUser }> => {
    const result: IUser = {};
    const { email, password } = data;
    try {
      const response: IUserRes = await new Promise((resolve, reject) => {
        client.GetUserEmail({ email: email }, (err: string, response: Response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });

      if (!response) {
        result.error = responseMessage.USER_NOT_FOUND;
        return result;
      }

      const isMatched: boolean = await bcrypt.compare(password, response.user.password);

      if (!isMatched) {
        result.error = responseMessage.PASSWORD_MISMATCH;
        return result;
      }

      const jwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY;

      if (!jwtSecretKey) {
        throw new Error(responseMessage.JWT_SECRET_KEY_NOT_FOUND);
      }
      // remove password from token
      delete response?.user?.password;
      const jwtTokenObj: { time: Date; user: IUser } = {
        time: new Date(),
        user: response?.user,
      };
      const token: string = jwt.sign(jwtTokenObj, jwtSecretKey, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const id: mongoose.Types.ObjectId = response.user._id;
      const data: IUser = await new Promise((resolve, reject) => {
        client.findById({ id: id }, (err: string, res: IUser) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
      if (!data) {
        result.error = responseMessage.USER_NOT_FOUND;
        logger.error(result.error + filename, { meta: result.error });
        return result;
      }
      data.token = token;
      return { result: data };
    } catch (error) {
      logger.error(error.message + filename, { meta: error });
      return { error: error.message };
    }
  },
};
export default AuthService;
