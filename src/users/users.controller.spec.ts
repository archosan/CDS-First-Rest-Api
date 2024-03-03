import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            signSync: jest.fn(),
          },
        },
        AuthGuard,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a getAllUsers method', () => {
    expect(controller.getAllUsers).toBeDefined();
  });

  it('should have a getProfile method', () => {
    expect(controller.getProfile).toBeDefined();
  });

  it('should return an array of users', () => {
    const result = controller.getAllUsers(10, 0, '', 50);
    expect(result.data).toHaveLength(10);
    expect(result.totalNumberOfUser).toBe(50);
  });

  it('should return a user', () => {
    const result = controller.getProfile();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('birthdate');
  });

  it('should call UsersService.getAllUsers with provided parameters', () => {
    const getAllUsersSpy = jest.spyOn(usersService, 'getAllUsers');
    controller.getAllUsers(10, 0, '', 50);

    expect(getAllUsersSpy).toHaveBeenCalledWith(10, 0, '', 50);
  });

  it('should call UsersService.getProfile', () => {
    const getProfileSpy = jest.spyOn(usersService, 'getProfile');
    controller.getProfile();

    expect(getProfileSpy).toHaveBeenCalled();
  });
});
