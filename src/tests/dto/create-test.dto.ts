import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto {
    @ApiProperty()
    title:string
}
