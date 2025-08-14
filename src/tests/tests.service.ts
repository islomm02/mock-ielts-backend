import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestsService {
  constructor(private prisma:PrismaService){}
  async create(data: CreateTestDto) {
    try {
      const test = await this.prisma.test.findFirst({where: {title: data.title}})
      if(test){
        throw new BadRequestException("test with this title exists")
      }
      const newTest = await this.prisma.test.create({data})
      return newTest
    } catch (error) {
      console.log(error);
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const tests = await this.prisma.test.findMany()
      return tests
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: string) {
    try {
      const test = await this.prisma.test.findFirst({where: {id}})
      if(!test){
        throw new NotFoundException("test not found")
      }
      return test
    } catch (error) {
      console.log(error) 
      return {message: error.message}

    }
  }

  async update(id: string, data: UpdateTestDto) {
    try {
      const test = await this.prisma.test.findFirst({where: {id}})
      if(!test){
        throw new NotFoundException
      }
      const updated = await this.prisma.test.update({where: {id}, data})
      return updated
    } catch (error) {
      console.log(error);
      return {message: error.message}            
    }
  }

  async remove(id: string) {
    try {
      const test = await this.prisma.test.findFirst({where: {id}})
      if(!test){
        throw new NotFoundException
      }

      const deleted = await this.prisma.test.delete({where: {id}})
      return deleted
    } catch (error) {
      console.log(error)
      return {message: error.message}
    }
  }
}
