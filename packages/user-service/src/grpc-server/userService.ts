import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import UserService from '../features/user/user.service';
import path from 'path';
const PROTO_PATH = path.resolve(__dirname, '../../../proto-files/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition) as any;
const users = [];
async function getUsers(body) {
  const obj = {
    limit: body?.limit || 10,
  };
  const userList = await UserService.list(obj);
  users.push(userList.users);
  return userList;
}

async function getUser(call, callback) {
  const body = call.request.body;
  const user = await getUsers(body);
  const response = {
    data: user?.users,
  };
  if (user) {
    callback(null, response);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Not Found',
    });
  }
}

async function getUserBYEmail(call, callback) {
  const email = call.request.email;
  const userData = await UserService.findUserByEmail(email);
  const response = { user: userData };
  if (userData) {
    callback(null, response);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Not Found',
    });
  }
}

async function findById(call, callback) {
  const id = call.request.id;
  const userData = await UserService.findById(id);
  const response = { user: userData };
  if (userData) {
    callback(null, response);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Not Found',
    });
  }
}

async function main() {
  const server1 = new grpc.Server();
  const server2 = new grpc.Server();

  server1.addService(userProto.user.UserService.service, {
    getUser: getUser,
    GetUserEmail: getUserBYEmail,
    findById: findById,
  });

  server2.addService(userProto.user.UserService.service, {
    getUser: getUser,
    GetUserEmail: getUserBYEmail,
    findById: findById,
  });

  server1.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('User gRPC server running at http://0.0.0.0:50051');
    server1.start();
  });

  server2.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
    console.log('User gRPC server running at http://0.0.0.0:50052');
    server2.start();
  });
}

main();
