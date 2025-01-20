import {Injectable} from "@nestjs/common";

@Injectable()
export class EncryptionService {
    async encryption(text) {
        const result = "iv" + text;

        console.log(result);

        return result;
    }
}