import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from '../../../generated/prisma/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  @IsNumber()
  @Min(18)
  @Max(99)
  edad: number;
  @IsOptional()
  @IsString()
  @IsIn([Role.ADMIN, Role.MANAGER, Role.USER])
  role?: Role;
}
