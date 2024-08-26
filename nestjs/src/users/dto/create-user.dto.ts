import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  id?: string;
  email: string;
  password: string;
  username: string;
  created_at?: string | Date;
}
