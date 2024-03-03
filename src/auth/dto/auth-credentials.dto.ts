import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Kullanıcının e-mail adresi',
  })
  @IsEmail({}, { message: 'Geçerli bir email adresi giriniz.' })
  @IsString()
  @MinLength(4, { message: 'Email en az 4 karakter uzunluğunda olmalıdır.' })
  @MaxLength(50, {
    message: 'Email en fazla 50 karakter uzunluğunda olmalıdır.',
  })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Kullanıcının şifresi',
  })
  @IsString()
  @MinLength(8, { message: 'Şifre en az 8 karakter uzunluğunda olmalıdır.' })
  password: string;
}
