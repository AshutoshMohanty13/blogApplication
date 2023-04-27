import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const BlogServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.BLOG_SVC_URL}:${process.env.BLOG_SVC_PORT}`,
    package: 'blogs',
    protoPath: join(__dirname, '../_proto/blog.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true,
      keepCase: true,
    },
    maxReceiveMessageLength:
      Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000,
    maxSendMessageLength:
      Number(process.env.GRPC_MAX_MESSAGE_SIZE_BYTES) || 21000000,
  },
};
