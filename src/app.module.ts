import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://catdmin:9WBvVanNXQ2qvd5t@catgram.0i9hww7.mongodb.net/?retryWrites=true&w=majority'),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
