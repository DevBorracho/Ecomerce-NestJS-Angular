export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  edad: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}
