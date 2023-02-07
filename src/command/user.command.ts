import { ICommand } from "@nestjs/cqrs";

import { createUserDto } from "src/users/dto";

export class CreateUserCommand implements ICommand {
    constructor({ email, name, password, gender }: createUserDto) {}
}
