import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class CustomPipe implements PipeTransform {
    /**
     * @param value 처리된 인자값
     * @param metadata 인자에 대한 메타 데이터 객체
     */
    transform(value: any, metadata: ArgumentMetadata): any {
        console.log("value", value);
        console.log("metadata", metadata);

        return "transform pipe";
    }
}