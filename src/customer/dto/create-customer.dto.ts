import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'The name of the customer',
    example: 'John Doe'
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the customer',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Whether the customer is active',
    example: true,
    default: true
  })
  isActive: boolean;
}
