import { PartialType } from "@nestjs/mapped-types";
import { User } from "../schemas/user.schema";

export class CreateUserDto extends PartialType(User) { }
