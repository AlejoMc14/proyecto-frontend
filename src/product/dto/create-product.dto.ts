import { IsString, IsUrl } from "class-validator";

export class CreateProductDto {
    @IsString()
    name:        string;
    @IsString()
    description: string;
    @IsString()
    price:       string;
    @IsString()
    image:       string;
    @IsUrl()
    link:        string;
}
