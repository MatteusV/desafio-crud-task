import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('Email or password is wrong.');
    }

    return { user };
  }

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExist) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await hash(createUserDto.password, 6);

    const user = await this.prisma.user.create({
      data: {
        password: passwordHash,
        email: createUserDto.email,
        username: createUserDto.username,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid user data');
    }

    return { user };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        id: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }
}
