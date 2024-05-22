// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf'

export class GetUserRequest extends jspb.Message {
  getUserid(): string
  setUserid(value: string): GetUserRequest

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetUserRequest.AsObject
  static toObject(
    includeInstance: boolean,
    msg: GetUserRequest,
  ): GetUserRequest.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: GetUserRequest,
    writer: jspb.BinaryWriter,
  ): void
  static deserializeBinary(bytes: Uint8Array): GetUserRequest
  static deserializeBinaryFromReader(
    message: GetUserRequest,
    reader: jspb.BinaryReader,
  ): GetUserRequest
}

export namespace GetUserRequest {
  export type AsObject = {
    userid: string
  }
}

export class GetUserResponse extends jspb.Message {
  getUserid(): string
  setUserid(value: string): GetUserResponse
  getName(): string
  setName(value: string): GetUserResponse
  getEmail(): string
  setEmail(value: string): GetUserResponse

  serializeBinary(): Uint8Array
  toObject(includeInstance?: boolean): GetUserResponse.AsObject
  static toObject(
    includeInstance: boolean,
    msg: GetUserResponse,
  ): GetUserResponse.AsObject
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> }
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>
  }
  static serializeBinaryToWriter(
    message: GetUserResponse,
    writer: jspb.BinaryWriter,
  ): void
  static deserializeBinary(bytes: Uint8Array): GetUserResponse
  static deserializeBinaryFromReader(
    message: GetUserResponse,
    reader: jspb.BinaryReader,
  ): GetUserResponse
}

export namespace GetUserResponse {
  export type AsObject = {
    userid: string
    name: string
    email: string
  }
}
