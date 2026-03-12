import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'Унікальний ідентифікатор користувача', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Ім\'я користувача', example: 'Іван Іванов' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Email адреса користувача', example: 'ivan@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Дата створення запису', example: '2024-01-18T12:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;
}
