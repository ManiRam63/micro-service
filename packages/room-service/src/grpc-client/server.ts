import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import RoomService from '../features/room/room.service';
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

async function getRoom(call, callback) {
  const roomId = call.request.roomId;
  const room = await RoomService.findById(roomId);

  const response = {
    roomData: room,
  };
  if (room) {
    callback(null, response);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Not Found',
    });
  }
}

function mainService() {
  const server1 = new grpc.Server();
  server1.addService(roomProto.room.RoomService.service, {
    getRoom: getRoom,
  });

  server1.bindAsync('0.0.0.0:50053', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Room gRPC server running at http://0.0.0.0:50053');
    server1.start();
  });
}

export default mainService;
