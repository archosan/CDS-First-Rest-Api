import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a getProfile method', () => {
    expect(service.getProfile).toBeDefined();
  });
  it('should have a getAllUsers method', () => {
    expect(service.getAllUsers).toBeDefined();
  });

  it('should return an array of users', () => {
    const result = service.getAllUsers(10, 0, '', 50);
    expect(result.data).toHaveLength(10);
    expect(result.totalNumberOfUser).toBe(50);
  });

  it('should return a user', () => {
    const result = service.getProfile();
    expect(result).toBeDefined();
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
    expect(result).toHaveProperty('birthdate');
  });
});
