import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsNotEmpty({ message: 'You must include a valid email' })
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  cellPhone?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  confirmed?: boolean;

  @ApiProperty({
    required: false,
  })
  taxId?: string;
}
