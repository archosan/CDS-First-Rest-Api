import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'access-token'),
          },
        },
        AuthGuard,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login method in service', () => {
    expect(service.login).toBeDefined();
  });

  it('should return a access-token when login is called', () => {
    const authCredentialsDto = {
      email: 'test@mockdata.com',
      password: 'password',
    };
    const result = service.login(authCredentialsDto);
    expect(result.access_token).toBeDefined();
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: authCredentialsDto.email,
      password: authCredentialsDto.password,
    });
  });
});
