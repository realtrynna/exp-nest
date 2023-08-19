import unzip from "unzipper";

import { Injectable } from "@nestjs/common";

@Injectable()
export class UnzipService {
    constructor() {
    }

    async unzip(buffer) {
        try {
            return unzip.Open.buffer(buffer);
        } catch (e) {
            console.log("unzip error occurred!");
            console.log(e);
        }
    }
}