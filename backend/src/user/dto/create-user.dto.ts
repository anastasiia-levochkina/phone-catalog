import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Ім\'я користувача',
    example: 'Іван Іванов',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2, { message: 'Ім\'я має містити мінімум 2 символи' })
  @MaxLength(100, { message: 'Ім\'я не може перевищувати 100 символів' })
  name: string;

  @ApiProperty({
    description: 'Email адреса користувача',
    example: 'ivan@example.com',
    maxLength: 255,
  })
  @IsEmail({}, { message: 'Невірний формат email' })
  @MaxLength(255, { message: 'Email не може перевищувати 255 символів' })
  email: string;
}
