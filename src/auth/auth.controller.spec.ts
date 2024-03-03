import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
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

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a login method', () => {
    expect(controller.login).toBeDefined();
  });

  it('should return an access token when login is successful', () => {
    const authCredentialsDto: AuthCredentialsDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const result = controller.login(authCredentialsDto);
    expect(result).toEqual({ access_token: 'access-token' });
  });

  it('should call AuthService.login with provided credentials', () => {
    const authCredentialsDto: AuthCredentialsDto = {
      email: 'test@example.com',
      password: 'password',
    };

    const loginSpy = jest.spyOn(authService, 'login');
    controller.login(authCredentialsDto);

    expect(loginSpy).toHaveBeenCalledWith(authCredentialsDto);
  });
});
