import { applyDecorators } from "@nestjs/common";
import {
    ApiParamOptions,
    ApiQueryOptions,
} from "@nestjs/swagger";

export type TApiOperation = {
    summary?: string;
    description?: string;
    requestBody?: any;
}

export type TApiResponse = {
    operation: TApiOperation;
    description?: string;
    auth?: boolean;
    basicAuth?: boolean;
    requestBody?: string;
    type?: any;
    schema?: any;
    deprecated?: boolean;
    params?: ApiParamOptions[];
    queries?: ApiQueryOptions[];
}