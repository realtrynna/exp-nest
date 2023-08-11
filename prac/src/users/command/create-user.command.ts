import { ICommand } from "@nestjs/cqrs";

export class CreateUserCommand implements ICommand {
    constructor({
        email,
        name,
        password,
        gender,
                }: {
        email: string,
        name: string,
        password: string,
        gender: string,
    }) {
    }
}
