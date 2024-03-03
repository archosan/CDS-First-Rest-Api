import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'totalNumberOfUser', required: false })
  getAllUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('totalNumberOfUser', new DefaultValuePipe(50), ParseIntPipe)
    totalNumberOfUser: number,
  ) {
    return this.usersService.getAllUsers(
      limit,
      offset,
      search,
      totalNumberOfUser,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile() {
    return this.usersService.getProfile();
  }
}
