import { ICommand } from "@nestjs/cqrs";

import { CreateUserDto } from "src/users/dto";

export class CreateUserCommand implements ICommand {
    constructor({ email, name, password, gender }: CreateUserDto) {}
}
