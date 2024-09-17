import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BlogGeneratorService } from './blog-generator.service';
import { BlogGeneratorController } from './blog-generator.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CONTENT_MANAGEMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'blog_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [BlogGeneratorService, ConfigService],
  controllers: [BlogGeneratorController],
})
export class BlogGeneratorModule {}
