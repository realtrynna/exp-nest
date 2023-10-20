import { applyDecorators } from "@nestjs/common";
import {
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiInternalServerErrorResponse, ApiParam, ApiQuery, ApiBearerAuth, ApiBasicAuth, ApiBody,
} from "@nestjs/swagger";

import type {
    TApiResponse,
    TApiOperation,
} from "src/types";

/**
 * 문서 생성
 */
export const CustomApiResponse = (option: TApiResponse) => {
    /**
     * 설명이 없다면
     */
    if (option.description) {
        option.description = option.operation.description;
    }

    const operation = option.operation;
    const operationOption = {
        ...operation,
        description: operation.description ? operation.description : option.description,
        summary: operation.summary ? operation.summary : option.description,
    };
    const { type, schema, ...partial } = option;

    if (option.requestBody) {
        operationOption.requestBody = option.requestBody;
    }

    const decorators = [
        ApiOperation({
            ...operationOption,
            deprecated: option.deprecated,
        }),
        ApiOkResponse(partial),
        ApiCreatedResponse(<Omit<TApiResponse, "type">>partial),
        ApiBadRequestResponse({
            description: "Client error",
        }),
        ApiForbiddenResponse({
            description: "No permission",
        }),
        ApiNotFoundResponse({
            description: "Not found resource",
        }),
        ApiInternalServerErrorResponse({
            description: "Internal server error",
        }),
    ];

    if (option.params) {
        option.params.forEach(param => decorators.push(ApiParam(param)));
    }

    if (option.queries) {
        option.queries.forEach(query => decorators.push(ApiQuery(query)));
    }

    if (option.auth) {
        decorators.push(ApiBearerAuth());
    }

    if (option.basicAuth) {
        decorators.push(ApiBasicAuth());
    }

    const bodyData = {};

    if (option.type) {
        bodyData[type] = option.type;
    }

    if (option.schema) {
        bodyData["schema"] = option.schema;
    }

    if (option.type || option.schema) {
        decorators.push(ApiBody(bodyData));
    }

    return applyDecorators(...decorators);
}