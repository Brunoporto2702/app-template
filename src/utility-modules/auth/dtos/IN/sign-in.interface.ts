import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignIn {
  @IsString()
  @IsNotEmpty({ message: 'You must include a valid email' })
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'You must include a password' })
  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;
}
