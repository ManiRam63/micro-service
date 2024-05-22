import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import path from 'path'
const PROTO_PATH = path.resolve(__dirname, '../../../proto-files/user.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const userProto: any = grpc.loadPackageDefinition(packageDefinition)
const client = new userProto.user.UserService(
  process.env.GRPC_PORT,
  grpc.credentials.createInsecure(),
)
export default client
