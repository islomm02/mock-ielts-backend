import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {
    @ApiProperty()
    question:string
    @ApiProperty()
    a:string
    @ApiProperty()
    b:string
    @ApiProperty()
    c:string
    @ApiProperty()
    d:string
    @ApiProperty()
    answer:string
    @ApiProperty()
    testId:string
}
