import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  async create(user: CreateUserDto) {
    user.username = user.username.toLowerCase();
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  update(id: string, user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
