import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ReturnUserDto } from './dto/return-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: ReturnUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiCreatedResponse({
    description: 'Return all users successfully.',
    type: [ReturnUserDto],
  })
  findAll(): Promise<ReturnUserDto[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'Return an user successfully.',
    type: ReturnUserDto,
  })
  findOne(@Param('id') id: string): Promise<ReturnUserDto> {
    return this.userService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'Return an user successfully.',
    type: ReturnUserDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Delete an user successfully.',
  })
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.remove(+id);
  }
}
