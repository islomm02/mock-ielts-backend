import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto {
    @ApiProperty()
    username:string
    @ApiProperty()
    password:string
}


export class RegisterDto{
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}