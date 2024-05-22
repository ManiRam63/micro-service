import mongoose from 'mongoose'

export interface IRoom {
  _id?: mongoose.Types.ObjectId
  name?: string
  roomType?: string
  createdBy?: mongoose.Types.ObjectId
  isDeleted?: boolean
  error?: string
  metaData?: IMetaData
  userId?: mongoose.Types.ObjectId
  roomId?: mongoose.Types.ObjectId
}

export interface IMetaData {
  totalRecords?: number
  currentPage?: number
  recordPerPage?: number
}
export interface IUserQuery extends Request {
  query?: IRoom
}
export interface UserData {
  _id?: mongoose.Types.ObjectId
  username: string
  email: string
  firstname: string
  lastname: string
  password: string
}

export interface UserRequest extends Request {
  user?: UserData
}
export interface IUserRes {
  user?: unknown
}

export interface IUserRequest extends Request {
  user?: unknown
}
