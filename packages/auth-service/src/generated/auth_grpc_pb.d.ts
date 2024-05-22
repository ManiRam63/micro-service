// package: user
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js'
import * as auth_pb from './auth_pb'

interface IUserServiceService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUser: IUserServiceService_IGetUser
}

interface IUserServiceService_IGetUser
  extends grpc.MethodDefinition<
    auth_pb.GetUserRequest,
    auth_pb.GetUserResponse
  > {
  path: '/user.UserService/GetUser'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<auth_pb.GetUserRequest>
  requestDeserialize: grpc.deserialize<auth_pb.GetUserRequest>
  responseSerialize: grpc.serialize<auth_pb.GetUserResponse>
  responseDeserialize: grpc.deserialize<auth_pb.GetUserResponse>
}

export const UserServiceService: IUserServiceService

export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  getUser: grpc.handleUnaryCall<auth_pb.GetUserRequest, auth_pb.GetUserResponse>
}

export interface IUserServiceClient {
  getUser(
    request: auth_pb.GetUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
  getUser(
    request: auth_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
  getUser(
    request: auth_pb.GetUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
}

export class UserServiceClient
  extends grpc.Client
  implements IUserServiceClient
{
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>,
  )
  public getUser(
    request: auth_pb.GetUserRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
  public getUser(
    request: auth_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
  public getUser(
    request: auth_pb.GetUserRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: auth_pb.GetUserResponse,
    ) => void,
  ): grpc.ClientUnaryCall
}
