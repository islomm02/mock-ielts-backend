import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginAuthDto, RegisterDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service'; 
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService, private jwt: JwtService){}
  async login(data: LoginAuthDto) {
    try {
      const user = await this.prisma.admin.findFirst({where: {username: data.username}})
      if(!user){
        throw new NotFoundException("User with this username not found")
      }
      const decoded = bcrypt.compareSync(data.password, user.password)
      if(!decoded){
        throw new BadRequestException("Invalid password")
      }
      const token = this.jwt.sign({id: user.id, role:user.role})
      return {token}
    } catch (error) {
      return {message: error.message}
    }  
  }

  async register(data:RegisterDto){
    try {
      const user = await this.prisma.admin.findFirst({where: {username: data.username}})
      if(user){
        throw new BadRequestException("User with this username already exists")
      }
      const hash = bcrypt.hashSync(data.password, 10)
      const newUser = await this.prisma.admin.create({data: {...data, password: hash}})
      return newUser
    } catch (error) {
      return {message: error.message}
    }
  }

}
