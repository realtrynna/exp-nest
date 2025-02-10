import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as CircuitBreaker from "opossum";
import axios from "axios";

@Injectable()
export class ExternalService {
    private circuitBreaker: CircuitBreaker;

    constructor() {
        this.circuitBreaker = new CircuitBreaker(
            this.getData,
            {
                timeout: 3_000,
                errorThresholdPercentage: 50,
                resetTimeout: 30_000,
            }
        )
    }

    async getData(url) {
        try {
            const res = await axios.get(url);

            return res.data;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async externalApi() {
        try {
            const res = await this.circuitBreaker.fire("http://httpbin.org/delay/10");

            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
}
