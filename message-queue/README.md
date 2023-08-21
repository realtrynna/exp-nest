## 라이브러리
```cmd
 npm i bull @nestjs/bull sharp @aws-sdk/client-s3 
 npm i -D @types/bull
```

<br>

#### Consumer 생성 방법
1. Provider <br>
```typescript
@Processor("큐 이름")
export class Processor {
    @Process("개별 큐 이름")
    async handleTask(job: Job) {
        
    }
}
```
2. Separate processes