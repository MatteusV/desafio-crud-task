import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.prisma.task.create({
      data: {
        description: createTaskDto.description,
        title: createTaskDto.title,
        userId,
      },
    });

    if (!task) {
      throw new BadRequestException('Invalide task data');
    }

    return { task };
  }

  async findAll(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    return { tasks };
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return { task };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: {
          id,
        },
        data: updateTaskDto,
      });

      return { task };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task not found`);
        }
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Task not found`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Task could not be deleted due to a conflict',
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
