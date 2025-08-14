import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService){}
  async create(data: CreateQuestionDto) {
    try {
      const question = await this.prisma.question.findFirst({where: {question: data.question}})
      if(question){
        throw new BadRequestException("Question with this question exists.")
      }
      const test = await this.prisma.test.findFirst({where: {id: data.testId}})
      if(!test){
        throw new NotFoundException("Test not found")
      }
      const newQuestionCount = test.questionsCount + 1
      await this.prisma.test.update({where: {id: data.testId}, data: {questionsCount:newQuestionCount }})
      const newQuestion = await this.prisma.question.create({data: data, include: {tests: true}})
      return newQuestion
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll(testId: string) {
    try {
      if(testId){
        const test = await this.prisma.question.findMany({where: {testId}})
        return test
      }else{
        const question = await this.prisma.question.findMany({include:{tests: true}})
        return question
      }
    } catch (error) {
      return {message: error.message}
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.question.findFirst({where: {id}, include: {tests:true}})
      if(!one){
        throw new NotFoundException("Question not found")
      }
      return one
    } catch (error) {
        return {message: error.message}      
    }
  }

  async update(id: string, data: UpdateQuestionDto) {
    try {
      const question = await this.prisma.question.findFirst({where: {id}})
      if(!question){
        throw new NotFoundException
      }
      const updated=  await this.prisma.question.update({where: {id}, data})
      return updated
    } catch (error) {
        return {message: error.message}      
    }
  }

  async remove(id: string) {
    try {
      const question = await this.prisma.question.findFirst({where: {id}})
      if(!question){
        throw new NotFoundException
      }
      const deleted=  await this.prisma.question.delete({where: {id}})
      return deleted
    } catch (error) {
        return {message: error.message}      
    }
  }
}
