import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
const PROTO_PATH = path.resolve(__dirname, '../../../proto-files/room.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const roomProto = grpc.loadPackageDefinition(packageDefinition) as any;
const client = new roomProto.room.RoomService('0.0.0.0:50053', grpc.credentials.createInsecure());
export default client;
