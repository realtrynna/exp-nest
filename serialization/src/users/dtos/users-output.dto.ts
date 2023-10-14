export class UsersOutputDto {
    _id: number;
    _email: string;
    _gender: boolean;

    constructor(
        id: number,
        email: string,
        gender: boolean
    ) {
        this._id = id;
        this._email = email;
        this._gender = gender;
    }
}