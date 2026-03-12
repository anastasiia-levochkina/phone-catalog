import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/user.entity';

@ApiTags('Користувачі')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всіх користувачів' })
  @ApiResponse({
    status: 200,
    description: 'Список користувачів успішно отримано',
    type: [User],
  })
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати користувача за ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID користувача' })
  @ApiResponse({
    status: 200,
    description: 'Користувач успішно знайдено',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Користувача не знайдено',
  })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Створити нового користувача' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Користувач успішно створено',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'Користувач з таким email вже існує',
  })
  @ApiResponse({
    status: 400,
    description: 'Невірні дані для створення користувача',
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Видалити користувача' })
  @ApiParam({ name: 'id', type: Number, description: 'ID користувача' })
  @ApiResponse({
    status: 204,
    description: 'Користувач успішно видалено',
  })
  @ApiResponse({
    status: 404,
    description: 'Користувача не знайдено',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
