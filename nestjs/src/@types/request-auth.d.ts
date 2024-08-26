import { Request } from 'express';

export interface RequestAuth extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    iat: number;
  };
}
