import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(authCredentialsDto: AuthCredentialsDto) {
    const payload = {
      email: authCredentialsDto.email,
      password: authCredentialsDto.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
