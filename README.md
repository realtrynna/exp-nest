<img src="https://user-images.githubusercontent.com/119386740/210351976-44486a71-6753-46cf-8cf5-0b1dd1ddd21e.jpg" width="300">

# NestJS로 배우는 백엔드 프로그래밍

| Date     | Content                                                               | Description                                                            |
|----------| --------------------------------------------------------------------- |------------------------------------------------------------------------|
| 23.01.03 | [Chapter1](#chapter1-hello-nestjs)                                    | Node와 Nest 특징, Decorator                                               |
| 23.01.04 | [Chapter2](#chapter2-웹-개발-기초-지식)                               | Controller에서의 Routing, Wildcard, Body, Exception, Header, StatusCode 설정 |
| 23.01.05 | [Chapter3](#chapter3-애플리케이션의-관문-인터페이스)                  | Dto, Service Layer의 특징, AOP, 횡단 관심사                                    |
| 23.01.06 | [Chapter4](#chapter4-핵심-도메인-로직을-포함하는-프로바이더)          | Provider, DI, Scope                                                    |
| 23.01.09 | [Chapter5](#chapter5-software-복잡도를-낮추기-위한-module-설계)       | Custom Provider, SW 복잡도를 낮추기 위한 Module 설계, Swagger                     |
| 23.01.10 | [Chapter6](#chapter6-dynamic-module을-활용한-환경-변수-설정)          | Module(Global, exports), Dynamic Module                                |
| 23.01.11 | [Chapter6](#chapter6-dynamic-module을-활용한-환경-변수-설정)          | Dynamic Module, Custom Configuration                                   |
| 23.01.16 | [Chapter7](#chapter7-파이프와-유효성-검사-요청이-제대로-전달되었는가) | Pipe, Validation, Transformer                                          |
| 23.01.17 | [Chapter7](#chapter7-파이프와-유효성-검사-요청이-제대로-전달되었는가) | Custom Validation, Authentication, Authorization                       |
| 23.01.18 | [Chapter8](#chapter8-영속화-데이터를-기록하고-다루기)                 | TypeOrm Config                                                         |
| 23.01.19 | [Chapter8](#chapter8-영속화-데이터를-기록하고-다루기)                 | TypeOrm Relations                                                      |
| 23.01.21 | [Chapter9](#chapter9-요청-처리-전-부가-기능을-수행하기-위한-미들웨어) | Repository Pattern, Middleware                                         |
| 23.01.25 | [Chapter10](#chapter10-권한-확인을-위한-가드-jwt-인증인가)            | Middleware, Guard                                                      |
| 23.01.26 | [Chapter10](#chapter10-권한-확인을-위한-가드-jwt-인증인가)            | Authentication(Sliding Session, Refresh Token)                         |
| 23.01.28 | [Chapter11](#chapter11-로깅-애플리케이션의-동작-기록)                 | Logger(BuiltIn, Custom)                                                |
| 23.01.30 | [Chapter12](#chapter12-모든-건-항상-실패한다-예외-필터)               | Exception(Handler, Filter)                                             |
| 23.01.31 | [Chapter13](#chapter13-인터셉터로-요청과-응답을-알맞게-바꾸기)        | Interceptor                                                            |
| 23.02.01 | [Chapter13](#chapter13-인터셉터로-요청과-응답을-알맞게-바꾸기)        | Lifecycle                                                              |
| 23.02.02 | [Chapter14](#chapter14-태스크-스케줄링)                               | Task Schedule                                                          |
| 23.02.04 | [Chapter15](#chapter15-헬스-체크-댁의-서버는-건강하신가요)            | Task Schedule                                                          |
| 23.02.07 | [Chapter16](#chapter16-cqrs를-이용한-관심사-분리)                     | Cqrs                                                                   |
| 23.02.08 | [Chapter17](#chapter17-클린-아키텍처)                                 | Clean Architecture                                                     |
| 23.02.09 | [Chapter17](#chapter17-클린-아키텍처)                                 | SOLID                                                                  |
| 23.02.15 | [Chapter18](#chapter18-테스트-자동화)                                 | Software Test                                                          |
| 23.02.20 | [Chapter18](#chapter18-테스트-자동화)                                 | Jest                                                                   |

<br>

<details>
<summary><strong>Request Lifecycle</strong></summary>
<div markdown="1">

1. Middleware <br>
   가장 먼저 전역 Binding Middleware(app.use)가 실행되며, 다음으로 Module에 Binding 된 Middleware가 실행된다. <br>
   Express Middleware와 작동 방식이 유사하며, 서로 다른 Module에 걸쳐 Binding 된 Middleware의 경우

</div>
</details>

<details>
<summary><strongs>공통 관심 사항과 관점 지향 프로그래밍</strongs></summary>
<div markdown="1">

1. **공통 관심 사항** (Cross Cutting Concern) <br>
   Application 에는 Logging과 같은 기본적인 기능과 Transaction과 같은 보안 관련 기능에 이르기까지 서비스 전반에 걸쳐 적용되는 공통 기능이 존재한다. <br>
   이러한 공통 기능은 특정 Module에만 쓰이는 게 아닌, 여러 Module에서 사용된다. <br>
   공통 기능은 비즈니스 로직과는 구분되는 기능이며, 이러한 기능을 공통 관심 사항이라고 부른다.

<br>

2. **관점 지향 프로그래밍** (Aspect Oriented Programming) <br>
   공통 관심 사항은 객체 지향 프로그래밍에 상속, 위임을 통해 여러 Module에 적용할 수 있지만 중복 코드가 양산된다는 한계점이 존재한다. <br>
   이러한 한계점을 효율적으로 극복하기 위해, AOP(Aspect Oriented Programming) 기법을 사용한다. <br>

   문제를 바라보는 관점으로 프로그래밍하며, <br>
   문제 해결을 위한 핵심 관심 사항과 서비스 전체에 적용되는 공통 관심 사항을 기준으로 나눔으로써, 공통 기능을 여러 Module에 쉽게 적용한다.

<br>

</div>
</details>

<details>
<summary><strong>Swagger</strong></summary>
<div markdown="1">

Nest는 Dto와 Decorator를 통해 Controller를 참조하여 Swagger 문서를 어느정도 자동화해준다. <br>
(Express는 Type이 없으므로 불가능 Typescript를 적용해도 불가능 Swagger 문서 자동화는 내부적으로 매우 복잡함)

<br>

**설치** <br>
Express를 기반으로 작동

```cmd
npm i @nestjs/swagger swagger-ui-express
```

<br>

**설정** <br>

```typescript
// main.ts
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
    .setTitle("제목")
    .setDescription("설명")
    .setVersion("1.0.0")
    .addCookieAuth("connect.sid") // SessionCookie?
    .build();
const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
        tagsSorter: "alpha",
        operationSorter: "method",
    },
});
```

<br>

**Decorator 종류**

```typescript
@ApiTags("기능 구분")

@ApiOperation({
    summary: "회원 가입",
    description:`

    `,
})

@ApiParam({
    name: "userId",
    required: true,
    description: `

    `,
})
@ApiResponse({
    status: 404,
    description: "NotFoundException",
})
@ApiOkResponse({
    status: 200,
    description: "사용자",
})
@Get("/userId")
findUserById(@Param("userId") userId: number) {

}

@ApiQuery({
    name: "limit",
    required: true,
    description: `

    `,
})
@ApiQuery({
    name: "page",
    required: true,
    description: `

    `,
})
@ApiBadRequestResponse({
    type: NotValidNumberError,
    description: "에러 내용",
})
@Get("/")
getUserList(
    @Query(new ValidationPipe({ transform: true }))
    userSearchRequest: UserSearchRequestDto,
) {

}
```

</div> 
</details>

<details>
<summary><strong>ConfigModule</strong></summary>
<div markdown="1">

Nest는 내부적으로 dotenv를 활용하는 **_Config_** 패키지를 제공한다. <br>

<br>

**설치**

```cmd
npm i @nestjs/config
```

<br>

**app.module.ts** <br>
Static Module을 가져올 경우와 달리 **_forRoot Method_** 를 호출한다. <br>
forRoot는 Dynamic Module을 Return 하는 Static Method다.

<br>

Dynamic Module 생성 시 forRoot 외 다른 이름을 사용해도 상관없지만 **_forRoot, register Convention_** <br>
비동기일 경우 forRootAsync, registerAsync <br>

```typescript
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [ConfigService.forRoot()],
})
export class AppModule {}
```

<br>

**forRoot** <br>
인수로 ConfigModuleOptions를 받는다. 즉 ConfigModule은 소비 Module이 원하는 옵션 값을 전달하여 **_동적_** 으로 ConfigModule을 생성한다. <br>

```typescript
static forRoot(options?: ConfigModuleOptions): DynamicModule
```

**.env 작성** <br>
**_envFilePath_** 속성으로 동적으로 환경 변수 설정

```typescript
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:
                process.env.NODE_ENV === "production"
                    ? ".production.env"
                    : process.env.NODE_ENV === "stage"
                    ? ".stage.env"
                    : "development.env",
        }),
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule {}
```

<br>

**ConfigService**
ConfigModule의 Provider를 원하는 Component에서 DI 하여 사용

> > > > > > > f360e7dc0ff3112449a08360829502a4394847e9

```typescript
import { ConfigService } from "@nestjs/config";

@Controller()
export class EmailService {
    #transporter: Mail;

    constructor(private readonly configService: ConfigService) {
        this.#transporter = nodemailer.createTransporter({
            service: this.configService.get("EMAIL_SERVICE"),
            auth: {
                user: this.configService.get("EMAIL_USER"),
                pass: this.configService.get("EMAIL_PASS"),
            },
        });
    }
}
```

<br>

**Custom Config**
DatabaseConfig, EmailConfig와 같이 그룹핑해서 처리하고 싶을 경우 사용한다. <br>
처음 인수로 Token 문자열을 받고 다음 인수로 ConfigFactory를 받는다. <br>
email이라는 토큰으로 ConfigFactory를 등록할 수 있는 함수를 의미한다. <br>

```typescript
// src > config > email.config.ts
import { registerAs } from "@nestjs/config";

export default registerAs("email", () => ({
    baseUrl: process.env.BASE_URL,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
}));
```

<br>

**nest-cli.json**
Nest의 기본 Build Option은 .ts 파일 외 Asset은 제외하도록 설정돼있다. <br>
.env 파일을 dist 폴더에 복사할 수 있도록 설정을 수정한다. <br>

```json
{
    "$schema": "https://json.schemastore.org/nest-cli",
    "collection": "@nestjs/schematics",
    "sourceRoot": "src",
    "compilerOptions": {
        "assets": [
            {
                "include": "./config/env/*.env",
                "outDir": "./dist"
            }
        ]
    }
}
```

<br>

</details>

<br>

# 오타

53p, Cusom => Custom <br>
228, 예외 필터에 예외 필터 대신 인터셉터가 들어감 <br>

<br>

## **_Chapter1_** Hello NestJS

**_NestJS_** 는 NodeJS 기반의 Web Framework 로 **_Express_** 또는 **_Fastify_** Framework를 Rapping 하여 동작한다. <br>
Express보다 Fastify가 성능적으로 **_2배 이상_** 빠르지만 범용적 측면과 Middleware 호환성을 고려해 기본적으로 **_Express_** 를 Rapping 한다. <br>

Express는 빠른 시간 안에 효율적인 서버 구축이 가능하고 뛰어난 확장성을 가지고 있지만 과도한 유연함으로 **_소프트웨어의 품질_** 이 일정하지 않다. <br>
높은 자유도는 양날의 칼이며 자유도가 높다 보니 프로젝트 규모가 커질 시 **_협업의 어려움_** 이 발생한다. <br>

NestJS는 Typescript를 기본으로 채택하고 Angular의 영향을 받아 만들어졌다. <br>
Module, Component 기반의 프로그래밍으로 코드의 **_재사용성_** 을 높인다. <br>
또한 Express 사용 시 쉽게 접할 수 없었던 **_IoC_**(Inversion Of Control), **_DI_**(Dependency Injection), **_AOP_**(Aspect Oriented Programing)과 같은 객체 지향 프로그래밍 Pattern으로 작성된다. <br>

<br>

**Web Framework가 제공해야할 필수 기능은 다음과 같다.** <br>

-   최신 ECMA 스크립트 지원
-   Typescript 지원
-   Command Query Responsibility Separation
-   HTTP Header Security (Express === Helmet)
-   편리한 설정
-   Interceptor
-   Middleware
-   Scheduling
-   Logging
-   Testing
-   Swagger
-   ORM

<br>

### **세팅**

**전역 명령어**

```cmd
npm i -g @nestjs/cli
```

<br>

**프로젝트 생성**

```cmd
nest new "프로젝트 이름"
```

<br>

**레이어 생성** nest -h 명령어로 확인 가능

```cmd
nest g mo users  // Module
nest g s users   // Service
nest g co users  // Controller
```

<br>

### **회원 가입 (UserService) 로직**

1. 회원 가입 정보를 받아 유효성 검사 후 Database에 저장 (**_가입 준비 단계_**)

<br>

2. 회원 가입 정보 중 이메일로 가입 확인 이메일 전송 <br>
   2-1. 사용자는 이메일 확인 후 가입 인증 요청 <br>
   2-2. 인증 요청 완료 시 가입 준비 단계에서 **_승인 완료_** 상태로 변경 <br>
   2-3. 이메일 인증의 응답으로 **_Access Token_** 전달과 동시에 **_로그인 상태_** 로 변경

<br>

#### **회원 가입 로직 구현에 필요한 부가 기능**

1. 환경 변수 <br>
   서버는 다음과 같은 환경에서 실행된다. <br>

-   로컬 환경 (**_Local_**): 개발자의 로컬 서버
-   스테이지 환경 (**_*Stage*_**): 배포 전 기능 테스트를 위한 서버
-   프로덕션 환경 (**_Production_**): 실제 운영 서버

<br>

> 각 환경에서 **_동적_** 으로 변경되는 변수들을 다르게 구성할 수 있다. <br>

<br>

2. 요청 유효성 검사 <br>
   클라이언트에서 입력값에 대한 유효성을 검사한다고 해도 완벽할 수 없으며 유효성 검사는 최종적으로 **_서버_** 에서 실행한다. <br>

<br>

3. 인증 <br>
   서버의 리소스에 접근하기 위해 사용자는 로그인 과정을 거쳐야 한다. <br>
   한번 로그인을 한 유저는 매 요청마다 로그인을 할 필요가 없으며 다음 후속 동작을 수행한다. <br>

<br>

4. 로그 <br>
   실제 서비스 운영 시 로그를 잘 남겨놔야 한다. <br>
   특정 에러 발생 시 원인을 빠르게 **_식별_** 할 수 있다. <br>

<br>

5. 헬스 체크 <br>
   서버의 상태를 **_주기적_** 으로 체크해야 한다. <br>
   상태가 좋지 않을 경우 알람을 발생시켜 대처할 수 있다. <br>

<br>

6. Command Query Responsibility Separation <br>
   프로젝트 규모가 커질 시 소스 코드가 스파게티처럼 될 수 있다. <br>
   Database의 데이터를 변경하는 로직과 조회 로직을 분리함으로써 **_성능_**, **_확장성_**, **_보안_** 을 강화할 수 있다.

<br>

7. 클린 아키텍처 <br>
   소프트웨어의 계층을 분리하고 **_저 수준_** 의 계층이 **_고 수준_** 의 계층에 의존하도록 한다. <br>
   의존 방향이 바뀌는 경우 **_DIP_**(Dependency Inversion Principle)을 활용해 안정적인 소프트웨어를 작성할 수 있어야한다.

<br>

8. 단위 테스트 <br>
   로직에 변경이 생긴다면 반드시 단위 테스트를 실시해야 한다. <br>
   단위 테스트는 개발자가 테스트 코드를 작성하여 수행하는 **_최소 단위_** 의 테스트 기법이다. <br>
   로직의 **_동작 조건_** 을 기술하고 주어진 입력에 대해 원하는 결과가 나오는지 검사한다.

<br>

## **_Chapter2_** 웹 개발 기초 지식

Web Framework 선택 시 고려 사항

<br>

1. 개발 문서 <br>
   쉽게 이해할 수 있고 잘 쓰인 문서는 사용자의 **_생산성_** 을 높인다.

<br>

2. 사용자 수 <br>
   사용자 수가 많다는 건 **_안정적으로 운용_** 된다는 반증이다. <br>
   또한 질문을 통해 답변을 얻을 수 있는 확률이 매우 크다.

<br>

3. 활성 커뮤니티 <br>
   특정 언어뿐만 아니라 Framework에 대한 커뮤니티도 매우 많다.

<br>

4. Github 이슈 대응 <br>
   대부분의 Framework는 오픈 소스로 개발하며 코드가 공개돼있다. <br>
   사용자들의 Report 하는 이슈를 얼마나 잘 대응하고 있는지도 중요한 요소이다. <br>
   마지막 업데이트가 오래됐거나 개발이 멈췄을 경우 관리가 되고 있지 않을 확률이 높다.

<br>

### **단일 스레드에서 구동되는 논 블로킹 I/O 이벤트 기반 비동기 처리 방식**

동시에 여러 Request가 들어올 경우 각 작업을 처리하기 위해 스레드를 생성하고 할당하는 방식을 멀티 스레딩이라고 한다. <br>
멀티 스레딩은 동시에 여러 작업을 처리할 수 있는 장점이 있지만 자원을 공유하기 위한 **_비용이 크고_** 동기화 논리적 오류 발생 시 **_Lock_** 이 걸릴 수 있다. <br>
스레드가 늘어날 경우 메모리를 사용하므로 메모리 관리도 중요하다.

<br>

NodeJS는 **_싱글 스레드_** 로 하나의 스레드가 모든 작업을 처리한다. <br>
**_Application Level_** 에서는 싱글 스레드지만 **_BackGround_** 에서는 **_스레드 풀_** 로 처리된다. <br>
스레드 풀은 **_libuv_** 라이브러리를 통해 동작하므로 개발자는 신경 쓸 필요 없다. <br>

<br>NodeJS는 Request에 대한 작업 완료 여부를 기다리지 않고 다음 작업을 실행하는 **_비동기 방식_** 이다. <br>
Request는 단일 스레드로 받지만 순서대로 처리하지 않고 먼저 처리되는 순서대로 이벤트를 **_Return_** 한다.

<br>

> libuv는 NodeJS에서 사용하는 비동기 I/O 라이브러리로 **_Kernel_** 을 사용해 처리할 수 있는 비동기 작업을 발견하면 Kernel에게 **_작업을 위임_** 한다. <br>
> 이후 이 작업들이 종료되어 Kernel로부터 **_System Call_** 을 받으면 **_Event Loop_** 에 **_CallBack_** 을 등록한다. <br>
> Kernel이 처리할 수 없는 작업은 별도의 스레드에서 처리된다.

<br>

### **Decorator**

Nest는 **_Decorator_** 를 적극 활용한다. Decorator를 잘 사용하면 **_횡단 관심사_**(Cross Cutting Concern)를 분리하여 관점 지향 프로그래밍을 적용한 코드를 작성할 수 있다. <br>

클래스, 메서드, 접근자, 프로퍼티, 매개변수에 적용 가능하다. <br>
각 요소의 선언부 앞에 **_@_** 키워드를 붙여 Decorator로 구현된 코드를 런타임 단계에서 **_같이 실행_** 한다.

<br>

```json
// tsconfig.json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

<br>

#### **데코레이터**

```typescript
function decorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    console.log("Decorator");
}

class UserDto {
    @decorator
    test() {
        console.log(this);
    }
}

const user = new UserDto();
user.test();
// Decorator
// UserDto
```

<br>

#### **커스텀 데코레이터**

Decorator에 인수를 넘겨 동작을 변경하고 싶다면 **_Decorator를 Return_**

```typescript
function decorator(value: string) {
    console.log("Decorator");
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        console.log(value);
    };
}
```

<br>

#### **타입스크립트 데코레이터**

1. Class Decorator
2. Method Decorator
3. Accessor Decorator
4. Property Decorator
5. Parameter Decorator

<br>

## **_Chapter3_** 애플리케이션의 관문 인터페이스

Nest의 Controller는 MVC Pattern의 **_Controller_** 를 의미한다. <br>

Controller란 Request를 받고 그에 대한 Response를 반환하는 **_인터페이스 역할_** 을 수행한다. <br>
Controller는 Endpoint Routing 메커니즘을 통해 각 Controller가 받을 수 있는 Request를 분류한다. <br>
사용 목적에 따라 구분하여 **_구조적_** 이고 **_Module화_** 된 소프트웨어를 작성할 수 있다.

<br>

서버에서 제공하는 **_리소스_** 를 어떤 식으로 클라이언트와 주고받을지에 대한 인터페이스를 정의하고 **_데이터의 구조_** 를 기술한다.

<br>

**Controller 생성**

-   Controller가 생성되면 AppModule에서 **_Import_** 하여 controllers에 삽입된다.

```cmd
nest g co Users
```

<br>

**Controller**

-   @Controller Decorator를 사용해 Controller의 역할을 명시한다.
-   @Get() Decorator의 인수로 **_Path_** 를 넣어준다.
-   @Controller() Decorator의 인수로 Routing Path의 **_Prefix_** 를 넣어줄 수 있다.

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("here")
export class AppController {
    constructor(private readonly appService: AppService) {}

    // /here
    @Get("/")
    getHello(): string {
        return this.appService.getHello();
    }

    // here/hello
    @Get("/hello")
    getEtc(): string {
        return "etc";
    }
}
```

<br>

**와일드 카드**

-   Express 와일드 카드와 개념 동일

```typescript
// here/*
@Get("/:userId/:postId")
findUserById(@Param("userId") userId: number, @Param("postId") postId: number) {
    userId;
    postId;
}
```

<br>

**요청 본문**

-   @Req Decorator로 다룰 수 있지만 @Req 객체를 직접 다루는 건 **_지양_** 해야 한다. (Testing을 위해??)
-   **_@Query()_**, **_@Param_**(key?: string), **_@Body()_** Decorator를 이용해 조작한다.

```typescript
import { Request } from "express";
import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "@./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Req() req: Request): string {
        console.log(req);
        return this.appService.getHello();
    }
}
```

<br>

**상태 코드**

-   @HttpCode() Decorator를 통해 응답 **_상태 코드_** 지정 가능

```typescript
import { HttpCode, Get, Param } from "@nestjs/common";

@HttpCode(200)
@Get(":id")
findUserById(@Param ("id") id: number): string {
    console.log(+id);
    return "user";
}
```

<br>

**예외 처리**

-   BadRequestException을 통해 예외 처리 가능
-   BadRequestException뿐만 아니라 다양한 Exception 내장

```typescript
import { BadRequestException } from '@nestjs/common/exceptions';

@Get(":id")
findUserById(@Param("id") id: number) {
    const userId = +id;

    if (userId <= 0) {
        throw BadRequestException("사용자 아이디는 0보다 큰 값이어야 합니다.");
    }

    return this.userService.findOne(userId);
}
```

<br>

**응답 헤더 설정**

-   @Header("key", "value") Decorator를 기반으로 응답 헤더 설정 가능
-   res.header()로도 설정 가능

```typescript
import { Header, Get, Param } from "@nestjs/common";

@Header("Custom", "Custom Header Value");
@Get(":id")
findUserById(@Param("id") id: number) {
    const userId = +id;

    return this.userService.findOne(userId);
}
```

<br>

**데이터 전송 객체**

-   계층 간 전송되는 데이터를 의미한다. (Data Transfer Object)

```typescript
export class CreateUserDto {
    email: string;
    nickname: string;
    password: string;
    gender: boolean;
}

@Post()
createUser(@Body() createUserDto: CreateUserDto) {
    const { email, nickname, password, gender } = createUserDto;
}
```

<br>

-   GET Request의 페이징 처리
-   GET /users?offset=0&limit=10
-   @Query() Dto로 처리

```typescript
export class GetUsersListDto {
    offset: number;
    limit: number;
}
```

<br>

### **Service**

**API**
| |Method | Url |Request|Response |
|------|-------|---|------|--------|
|회원 가입|POST| /users| email, name, password, gender | "" |
|이메일 인증|POST|/users/verify-email|verifyEmailToken | ""|
| 로그인 | POST | /users/login | email, password | "" |
| 회원 정보 조회 | GET | /users/:id | "" | "" |

<br>

**관점 지향 프로그래밍 (Aspect Oriented Programing)** <br>

횡단 관심사의 **_분리를 허용_** 함으로써 Module 성의 증가를 지향하는 프로그래밍 패러다임이다. <br>

서버(백엔드)가 갖춰야 할 요구 사항은 매우 많다. <br>

비즈니스 로직을 구현하기 위한 사용자의 요구 사항뿐만 아니라 서버가 안정적으로 운영되기 위해 필요한 Validation, Logging, Security, Transaction과 같이 Application 전반에 걸쳐 제공해야 하는 **_공통 관심사_** 를 횡단 관심사(Cross Cutting Concern)라고 부른다. <br>
소스 코드를 횡단 관심사로 분리하지 않을 경우 비즈니스 로직과 횡단 관심사의 코드가 **_뒤죽박죽_** 될 수 있다. <br>
이는 코드의 가독성을 해치고 서비스의 유지 보수를 어렵게 만든다. <br>

Nest에서는 횡단 관심사와 비즈니스 로직의 분리가 용이하며 대표적인 Component로 **_Interceptor_** 가 있다. <br>
Interceptor란 Request와 Response를 가로채 변형시킬 수 있다. 또한 **_ExceptionFilter_** 를 활용해 어떤 로직에서 발생하는 에러를 잡아 일괄적인 예외 처리 로직으로 동작시킬 수 있다. <br>

Nest에서는 **_@Decorator_** 를 활용해 **_AOP_** 를 적용한다. <br>

AppModule에 **_Global_** 로 적용할 수도 있고 특정 Component에만 적용할 수 있다. **_특정 Component_** 는 Decorator로 구현한다.

<br>

## **_Chapter4_** 핵심 도메인 로직을 포함하는 프로바이더

Controller는 Request와 Response를 적절히 가공하여 처리하는 역할을 담당한다. <br>

서버의 핵심은 전달받은 데이터를 어떻게 **_비즈니스 로직_** 으로 구현하는 가에 있다. <br>
Application이 제공하는 핵심 기능 즉 **_비즈니스 로직을 수행하는 역할_** 을 하는 게 Provider다. <br>

Controller에서 비즈니스 로직을 처리할 수 있지만 이는 **_단일 책임 원칙_**(Single Responsibility Principle) SRP에 부적합하다. <br>

Provider는 **_@Injectable() @Decorator_** 가 붙은 **_Service_**, **_Repository_**, **_Factory_**, **_Helper_** 등 여러 가지 형태로 구현 할 수 있다. <br>

Nest에서 제공하는 Provider의 핵심은 의존성을 주입할 수 있다는 점이다. <br>

<br>

-   **Controller** <br>
    Controller는 비즈니스 로직을 직접 실행하지 않는다. <br>
    Controller에 **_Constructor_**(생성자)에서 주입받아 UserService라는 **_멤버 변수_** 에 할당되어 userService를 호출해 로직을 처리한다. <br>

```typescript
@controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Delete("/:id")
    removeUser(@Param("userId") userId: number): Promise<boolean> {
        return this.userService.removeUser(userId);
    }
}
```

<br>

-   **Service** <br>
    **_@Injectable() Decorator_** 를 선언함으로써 Nest의 어떤 Component에서도 주입할 수 있는 Provider가 된다. <br>
    별도의 Scope를 지정하지 않으면 기본적으로 **_Singleton_** Instance가 생성된다. <br>

```typescript
@Injectable()
export class UserService {
    removeUser(userId: number) {
        return true;
    }
}
```

<br>

### **Provider 등록과 사용**

1. Provider 등록 <br>
   Provider Instance 역시 **_Module_** 에서 사용할 수 있도록 등록 해줘야 한다.

<br>

-   user.module.ts

```typescript
import { UserService } from "";

@Module({
    providers: [UserService],
})
export class UserModule {}
```

<br>

1. 속성 기반 주입 <br>
   보통 Constructor(생성자)를 통해 Provider를 주입한다. <br>
   하지만 Provider를 직접 주입받아 사용하지 않고 상속 관계에 있는 **_자식 클래스_** 를 주입받아 사용할 수도 있다. <br>
   자식 클래스에서 부모 클래스가 제공하는 Method를 호출하기 위해서는 부모 클래스에서 필요한 Provider를 **_super()_** 를 통해 전달해야 한다. <br>

<br>

-   base.service.ts

```typescript
export class BaseService {
    constructor(private readonly serviceA: ServiceA) {}

    baseServiceMethod() {
        return "baseService Method입니다.";
    }

    doSomeServiceAMethod() {
        return this.serviceA.serviceAMethod();
    }
}
```

-   service.a.ts

```typescript
@Injectable()
export class ServiceA {
    method() {
        return "ServiceA Method입니다.";
    }
}
```

-   service.b.ts

```typescript
@Injectable()
export class ServiceB extends BaseService {
    constructor(private readonly _serviceA: ServiceA) {
        super(_serviceA);
    }

    method() {
        return this.BaseService.doSomeServiceAMethod();
    }
}
```

<br>

### **Scope**

NodeJS는 다른 Web Framework와 다르게 멀티 스레드 상태 비저장(Stateless) Model을 따르지 않는다. <br>

따라서 Singleton 방식을 사용하는 건 매우 안전하며 이는 Request로 들어오는 모든 정보(Database Connection 등)가 공유될 수 있다는 걸 의미한다. <br>

<br>

-   Controller와 Provider에 Scope를 주어 **_생명주기_** 를 지정하는 방법이 있다. <br>
    Scope의 종류는 다음과 같으며 가급적 DEFAULT Scope 사용을 권장한다. 이유는 Instance 캐싱과 초기화가 Application 시작 중 한 번만 발생하므로 메모리와 동작 성능을 향상시킬 수 있다.

<br>

1. DEFAULT: Singleton Instance가 모든 **_Application과 공유_** 된다. Instance 수명은 Application의 수명과 같다. <br>
   Application이 Bootstrap 과정을 마치면 모든 Singleton Provider의 Instance가 만들어진다. 따로 선언하지 않으면 DEFAULT

<br>

2. REQUEST: 들어오는 Request마다 별도의 Instance가 생성된다. Request를 처리하고 나면 Instance는 **_Garbage-colleted_**

<br>

3. TRANSIENT: **_임시_** 라는 의미로 이 Scope를 지정한 Instance는 공유되지 않는다.

<br>

### **Provider에 Scope 주기**

-   @Injectable() Decorator에 Scope

```typescript
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class userService {}
```

<br>

### **Scope Layer**

Scope Layer는 Component가 가질 수 있는 Scope의 **_범위_** 를 나타낸다. <br>
Scope는 **_Controller_** 와 **_Provider_** 에 선언 가능하며 연관된 Component들이 서로 다른 Scope를 가지게 된다면 어떻게 될까. <br>

**_UserController_** => **_UserService_** => **_UserRepository_** 와 같은 종속성 그래프를 가지고 있는 상태에서 UserService는 **_REQUEST_** Scope를 가지고 나머지는 모두 **_DEFAULT_** Scope를 가질 경우를 가정. <br>
UserController는 UserService에 의존적이므로 REQUEST로 Scope가 변경된다. <br>
하지만 UserRepository는 UserService에 종속되지 않으므로 그대로 DEFAULT로 남게 된다. <br>

결과적으로 종속성을 가진 Component의 Scope를 따라가게 된다.

<br>

## **Custom Provider**

일반적인 Provider 등록 방법

```typescript
// users.module.ts
@Module({
    providers: [UserService],
})
export class UsersModule {}
```

기능을 추가로 확장하다 보면 라이브러리의 선언된 클래스를 가져오거나 Test Code에 Mocking을 하려고 할 경우 위 방식은 문제가 될 수 있다. <br>

다음과 같은 3가지 경우에 **_Custom Provider_** 를 사용하면 효율적이다.

<br>

1. Nest가 만들어주는 Instance 또는 Cache Instance 대신 Instance를 직접 생성하고 싶은 경우 <br>
2. 여러 Class가 의존관계에 있을 경우 이미 존재하는 Class를 재사용하고싶을 경우 <br>
3. Test를 위해 Mocking Version으로 재정의 하려는 경우

<br>

### **Provider 종류**

1. value Provider <br>
2. class Provider <br>
3. factory Provider <br>

<br>

## **_Chapter5_** Software 복잡도를 낮추기 위한 Module 설계

일반적으로 Module 이라고 하면 작은 Class, Function 처럼 1가지 기능만 수행하는 Component가 아니라 여러 Component를 조합하여 **_더 큰 기능_** 을 수행할 수 있게 하는 단위를 의미한다.

<br>

채팅 서비스에서 사용자의 정보를 관리하고 로그인을 처리하는 UserModule, 사용자의 채팅을 관리하고 저장하는 ChatModule, 이 처럼 여러 개의 Module이 모여 서비스가 완성된다. <br>
Nest Application이 실행되기 위해서 하나의 Root Module(AppModule)이 존재하고 이 **_Root Module_** 은 여러 가지의 다른 Module로 구성되어있다. <br>
Module을 기능 별로 분리하는 이유는 여러 Module 간의 각자 맡은 **_책임을 나누고 응집도를 높이기 위함이다._** <br>
또한 Microservice Architecture의 관점에서, 하나의 Module이 거대해지면 하나의 Microservice로 분리할 수도 있다.

<br>

Module을 어떻게 나눌 건지에 대한 명확한 기준은 존재하지 않는다. <br>
서비스를 설계하면서 또는 규모가 커지면서 유사한 기능끼리 Module로 **_그룹핑_** 해야한다. <br>
Module 간의 **_응집도_** 를 높이는 작업을 게을리하면 의존 관계가 매우 복잡해져 **_유지 보수_** 가 어려워진다.

<br>

Module은 @Module Decorator를 사용하며 인수로 **_ModuleMetadata_** 를 받는다. <br>

```typescript
export declare function Module(metadata: ModuleMetadata): ClassDecorator;

export interface ModuleMetadata {
    imports?: Array<
        Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    controllers?: Type<any>[];
    providers?: Provider[];
    exports?: Array<
        | DynamicModule
        | Promise<DynamicModule>
        | string
        | symbol
        | Provider
        | ForwardReference
        | Abstract<any>
        | Function
    >;
}
```

<br>

1. **imports** <br>
   현재 Module에서 사용하기 위한 Provider를 가지고 있는 다른 Module을 가져온다. <br>
   (AppModule에서 UserModule, PostModule을 가져와 Build)

<br>

2. **controllers/providers** <br>
   Module 전반에서 Controller와 Provider를 사용할 수 있도록 Nest가 객체를 생성 후 **_Injection_**

<br>

3. **export** <br>
   현재 Module에서 다시 내보낸다. (export) <br>
   A, B, C Module이 있을 경우 A가 B를 가져오고 C가 A를 가져왔다고 가정 <br>
   C가 B를 가져올 경우 가져온 Module을 내보내야 한다. <br>
   export로 내보내면 어디에서나 가져다 쓸 수 있도록 **_Public Interface_** 또는 **_API_** 로 간주한다. <br>

<br>

### **Module Export**

가져온 Module은 다시 **_내보내기_** 가 가능하다. <br>

서비스 전반에 쓰이는 공통 기능을 모아놓은 **_CommonModule_**, 공통 기능이지만 Application을 구동하는데 필요한 기능을 모아놓은 **_CoreModule_** 이 있다. <br>
Root Module은 CommonModule, CoreModule 둘 다 가져오는 게 아니라 CoreModule만을 가져오고 CoreModule에서 가져온 CommonModule을 다시 내보내면(Export) AppModule에서 CommonModule을 가져오지 않아도 사용할 수 있다. <br>

-   CommonModule

```typescript
@Module({
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule
```

<br>

-   CommonService
    hello Method를 가지고 있다.

```typescript
// common.service.ts
@Injectable()
export class CommonService {
    hello(): string {
        return "This is commonService";
    }
}
```

<br>

-   CoreModule
    CommonModule을 가져온 후 다시 내보낸다.

```typescript
@Module({
    imports: [CommonModule],
    exports: [CommonModule],
})
export class CoreModule {}
```

<br>

-   AppModule

```typescript
@Module({
    imports: [CoreModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

<br>

-   AppController
    CommonModule에 Provider인 CommonService에 hello Method를 사용할 수 있다.

```typescript
@Controller()
export class AppController {
    constructor(private readonly commonService: CommonService) {}

    @Get("/")
    hello(): string {
        return this.commonService.hello();
    }
}
```

> Module은 Provider처럼 Inject 해서 사용할 수 없다. (**_Module 간의 순환 종속성 발생_**) <br>

<br>

### **Global Module**

Nest는 Module 범위 내에서 Provider를 **_캡슐화_** 한다. 따라서 어떤 Module에 있는 Provider를 사용하려면 Module을 먼저 가져와야 한다. <br>

Helper, Database Connection과 같은 공통 기능의 Provider가 필요한 경우가 있다. <br>
이런 Provider를 모아 Global Module로 제공하면 된다.

<br>

-   **Global Module** <br>
    **_@Global() Decorator_** 로 선언한다. <br>
    Global Module은 RootModule이나 CoreModule에서 한 번만 등록해야 한다. <br>
    Global 생성은 SW 구조상 **_지양_** 해야 한다. Global로 만들면 기능이 어디에나 존재하므로 응집도가 떨어진다. <br>

```typescript
@Global()
@Module({
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
```

<br>

## **_Chapter6_** Dynamic Module을 활용한 환경 변수 설정

지금까지 사용한 UserModule, EmailModule 등은 모두 **_Static Module_** 이다. <br>

**_Dynamic Module_** 이란 Module 실행 시 **_동적_** 으로 어떠한 변수들이 정해진다. <br>
즉 Host Module(Provider, Controller와 같은 Component를 제공하는 Module)을 가져다 쓰는 소비 Module에서 Host Module을 생성할 경우 동적으로 값을 설정하는 방식이다. <br>

Dynamic Module을 사용하면 코드가 간결해진다. <br>
Module Instance 생성 시 결정되기는 하지만 Module Instance마다 다르게 결정되어야 하는 걸 소비 Module에서 지정할 수 있고 Static, Dynamic Module과 같이 제공할 수도 있다. <br>

Dynamic Module에 대표적인 예로 실행 환경에 따라 동적으로 서버에 설정되는 환경 변수를 관리하는 **_Config Module_** 이 있다. <br>

<br>

### **일반적인(dotenv) 환경 변수 관리 방법**

Database Host는 실행 환경에 따라 동적으로 달라져야한다. <br>

```cmd
Local: localhost
Staging: stage-reader.com
Production: prod-reader.com
```

<br>

설치

```cmd
npm i dotenv
```

<br>

-   개발 환경: .development.env <br>

```cmd
DATABASE_HOST=localhost
```

<br>

-   스테이지 환경: .stage.env <br>

```cmd
DATABASE_HOST=stage-reader.com
```

<br>

-   배포 환경: .production.env <br>

```cmd
DATABASE_HOST=prod-reader.com
```

<br>

-   package.json script 수정

```json
"scripts": {
    "prebuild": "rimraf dist",
    "start:dev": "npm run prebuild && NODE_ENV=development nest start --watch"
}
```

<br>

-   main.ts

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(
        process.env.NODE_ENV === "production"
            ? ".production.env"
            : process.env.NODE_ENV === "stage"
            ? ".stage.env"
            : ".development.env",
    ),
});

async function bootstrap() {}
```

<br>

### **의존성 주입과 제어 반전**

좋은 개발자는 항상 좋은 **_Software Architecture_** 를 설계하고 이해하려고 노력해야 한다. <br>
프로젝트는 시간이 지날수록 규모가 커지고 복잡해진다. Architecture 고민은 유지 보수와 생산성 향상을 위해 반드시 해야 하는 이유다. <br>
객체 지향 원칙, SOLID 설계 원칙, Layered Architecture 등을 학습할 수 있는 로버트 마틴의 **_클린 아키텍처_** 서적을 추천한다. <br>

<br>

-   **\*제어 반전** <br>
    SOLID 원칙의 D에 해당하는 **_의존 관계 역전 원칙_** 을 구현하기 위해서는 제어 반전(**_Inversion Of Control_**) Container 기술이 필요하다. <br>
    Nest에서 Framework에 IoC를 구현하며, Provider(Service)를 다른 Component에 주입한 경우가 이에 해당한다. <br>

    다음은 UserController는 UserService에 **_의존적_** 이다. UserService는 **_Object Life Cycle_** 에는 전혀 관여하지 않는다. <br>
    어디선가 자신의 생성자에 주어지는 객체를 가져다 쓰고 있을 뿐이다. 이 역할을 수행하는 게 IoC이다. <br>
    IoC에 도움으로 객체의 Object Life Cycle에 신경 쓰지 않아도 되며, 이로 인해 코드가 읽기 쉬워지며 직관적인 형태로 변한다. <br>

<br>

-   **의존성 주입** <br>
    의존성 주입(Dependence Injection)은 IoC Container가 **_직접_** Object Life Cycle를 관리하는 방식이다. <br>

    A 객체에서 B 객체가 필요할 경우(A는 B에 의존적) A Class에서 B Class를 직접 생성하여 사용할 수 있다. <br>
    이 경우 문제는 B의 구현체가 변경되었을 경우 발생한다. A는 B를 직접 참조하고 있으므로 B가 변경될 경우 Compiler는 A를 다시 Compile 해야 한다. <br>
    A와 B가 Class가 아니라 Module이라고 하면 그 변경의 크기는 매우 커지게 되고 Compile 시간은 더 오래 걸린다.

<br>

**IoC 미적용**

```typescript
export interface UserMeta {
    getLanguage: () => string;
}

@Injectable()
export class AUser implements UserMeta {
    getLanguage() {
        return "JavaScript"
    }
}

@Injectable()
export class BUser implements UserMeta {
    getLanguage() {
        return "TypeScript"
    }
}

// Property로 UserMeta 멤버 변수 선언 후 생성자로 호출
class App {
    private readonly userMeta: UserMeta

    constructor() P
    this.userMeta = new AUser()
}
```

<br>

**IoC 적용**
UserMeta의 멤버 변수는 IoC가 담당한다.

```typescript
class App {
    constructor(@Inject("UserMeta") private readonly userMeta: UserMeta) {

    }
}

// Module 선언
@Module({
    controllers: [UserController],
    providers: [
        UserService,
        [
            provide: "UserMeta",
            useClass: AUser,
        ],
    ]
})
```

<br>

## **_Chapter7_** 파이프와 유효성 검사 요청이 제대로 전달되었는가

Pipe는 Request가 Handler로 전달되기 전 **_Request Object_** 를 **_변환_** 할 수 있는 기회를 제공하며 Middleware와 역할과 동일하다. <br>

> Middleware는 Application의 모든 Context에서 사용할 수 없다. Middleware는 현재 Request가 어떤 Handler에서 수행되는지 어떤 Parameter를 가지고 있는지에 대한 Execution Context를 모른다.

<br>

Pipe는 주로 다음과 같은 **_목적_** 으로 사용된다. <br>

1. **_변환_** (Transformation) <br>
   Request Data를 원하는 형식으로 변환한다. /users/:userId의 Params를 String에서 Number 형태로 변환 <br>

2. **_유효성 검사_** (Validation) <br>
   Request Data가 사용자가 정한 기준에 적합한지 검사

<br>

Nest는 다음과 같은 내장 Pipe를 제공한다. <br>

-   ValidationPipe
-   ParseIntPipe
-   ParseBoolPipe
-   ParseArrayPipe
-   ParseUUIDPipe
-   DefaultValuePipe

<br>

**_ParseIntPipe_**, **_ParseBoolPipe_**, **_ParseArrayPipe_**, **_ParseUUIDPipe_** 는 전달된 **_Parameter의 Type_** 을 검사하는 용도다.

<br>

**ParseIntPipe** <br>
@Param() Decorator의 **_두 번째_** 인수로 Pipe를 넣어 현재 **_ExecutionContext_** 에 바인딩 <br>
Parsing 할 수 없는 Parameter(String)를 전달할 경우 알아서 **_Exception Response_** 발생 <br>
Exception 발생할 경우 Controller에 **_Request가 도달하지 않음_** <br>

```typescript
@Get("/:userId")
findUserById(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findUserById(userId);
}
```

<br>

**Exception Response**

```typescript
{
    "statusCode": 400,
    "message": "Validation ...",
    "error": "Bad Request"
}
```

<br>

**Custom Exception Response**

```typescript
@Get("userId")
findUserById(@Param("userId", new ParseIntPipe({ errorHttpStatusCode: 500 })))
```

<br>

**DefaultValuePipe**
Parameter의 기본값 설정 시 사용 <br>
**_Query Parameter_** 가 생략된 경우 유용하게 사용 가능 <br>

```typescript
@Get()
findUserList(
    @Query("offset", new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
) {
    console.log(offset, limit);
}
```

<br>

**Custom Pipe** <br>
Custom Pipe는 **_PipeTransform Interface_** 를 상속받은 클래스에 @Injectable Decorator를 붙여 만든다. <br>

-   Custom Pipe <br>
    **_value_**: 현재 Pipe의 전달된 인수 <br>
    **_metadata_**: 현재 Pipe의 전달된 인수의 Metadata

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(metadata);
        return value;
    }
}

// PipeTransform 원형
export interface PipeTransform<T = any, R = any> {
    transform(value: T, metadata: ArgumentMetadata): R;
}

// userController
@Get("/:userId")
findUserById(@Param("userId", ValidationPipe) userId: number) {
    console.log(userId);
}
```

<br>

**ValidationPipe (유효성 검사 파이프)**

```cmd
npm i class-validator class-transformer
```

<br>

-   Nest가 제공하는 ValidationPipe 전역으로 적용 <br>
    class-transformer를 적용시키려면 **_transform: true_**

```typescript
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(3000);
}

bootstrap();
```

<br>

```typescript
import { Transform } from "class-transformer";

export class CreatePostDto {
    // obj => 현재 객체(Dto) 가리킴
    @Transform(({ key, value, obj }) => {
        return value === undefined ? null : value;
        // 또는
        return value.trim();
    })
    imageUrl: string;
}
```

<br>

**Throw Exception** <br>

```typescript
@Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
        return new BadRequestException("비밀번호는 이름과 같은 문자열을 포함할 수 없습니다.");
    }
})
```

<br>

**Custom Throw Error** <br>
유효성 검사를 수행하는 Decorator를 직접 만들 수 있다. <br>
Nest의 기술이 아니라 class-validator의 영역 <br>

```typescript
// not.in.ts
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

export function notIn(
    property: string,
    validationOptions?: ValidationOptions, // Decorator의 인수는 객체에서 참조하려고 하는 다른 속성의 이름과 ValidationOptions을 받는다.
) {
    return (object: Object, propertyName: string) => {
        // registerDecorator를 호출하는 함수를 리턴한다. 이 함수의 인수로 Decorator가 선언될 객체와 속성의 이름을 받는다.
        registerDecorator({
            // registerDecorator 함수는 ValidationDecoratorOptions 객체를 인수로 받는다.
            name: "notIn", // Decorator 이름
            target: object.constructor, // 이 Decorator는 객체 생성 시 적용
            propertyName,
            options: validationOptions, // 유효성 옵션은 Decorator의 인수로 전달받은 걸 사용한다.
            constraints: [property], // 이 Decorator는 속성에 적용되도록 제약 부여
            validator: {
                // 유효성 검사 규칙 작성 (ValidatorConstraint Interface를 구현한 함수)
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];
                    return;
                    typeof value === "string" &&
                        typeof relatedValue === "string" &&
                        !relatedValue.includes(value);
                },
            },
        });
    };
}
```

<br>

### **인증(Authentication)과 인가(Authorization)**

최근 서비스들은 **_인가_**(Authorization)를 얻기 위한 수단으로 JWT를 사용한다. <br>

로그인 성공 시 Server는 Token을 발급하며 Client는 매 요청마다 Header에 Token을 실어 보낸다. <br>
이후 Server는 Token에 대한 유효성을 검증 후 얻은 정보를 토대로 인가를 진행한다. <br>
인증(Authentication)과 인가(Authorization)는 항상 같이 등장하는 개념이지만 사용 시 **_혼용_** 되는 경우가 많다.

<br>

1. **_인증_**(Authentication) <br>
   인증은 어떤 개체(**_사용자 또는 장치_**)의 **_신원을 확인_** 하는 과정이다. 개체는 보통 어떤 인증 요소(**_Authencation Factor_**)를 증거로 제시하여 자신을 **_증명_** 한다. <br>
   은행에 가서 돈을 인출하려면 내가 누군지 은행에게 확인시켜주기 위해 신분증을 제시하는데 이 과정이 개체의 신원을 확인하기 위한 과정에 해당한다. <br>

   Online에서도 마찬가지다. 특정 서비스 이용 시 보통 아이디와 패스워드를 입력하거나 휴대폰에 전달된 인증번호를 입력한다. <br>
   인증 요소(Authencation Factor)는 **_하나_** 일 수도 있고 두개 또는 그 이상(**_Multi Factor_**)일 수 있다. <br>

2. **_인가_**(Authorization) <br>
   인증과 달리 인가는 개체(**_사용자 또는 장치_**)가 **_특정 리소스_** 에 접근할 수 있는지 또는 어떤 동작을 수행할 수 있는지 검증하는 과정 즉 **_접근 권한_** 을 의미한다. <br>
   공연장에 입장하기 위해 표를 제시하는 과정과 동일하다. 공연장은 나의 신원을 확인하고자 하는 게 아니라 입장할 권한이 있는지 없는지만 관심 있다. <br>
   신원 정보를 포함하고 있지 않더라도 입장이 실패하지 않는다. <br>

   보통 Application은 Token을 사용해 인가 과정을 진행한다. 사용자가 로그인을 하면 Application은 사용자가 뭘 할 수 있는가에 관심을 가지며 사용자 신원을 바탕으로 인가 세부사항을 가진 Token을 생성한다. <br>
   이렇게 발급된 인가 Token을 이용해 리소스에 대한 접근을 허용할지 말지 결정한다.

<br>

> 인증은 인가로 이어지지만 **_인가가 인증으로 이어지지는 않는다._** <br>
> 신원 증명이 접근 권한을 승인하기에 충분하다 해도 즉 무언가 얻는 데 인가를 받을 수 있다고 해도 인가가 항상 개체를 **_식별_** 할 순 없다.
> 비행기 탑승권은 인가와 인증 역할을 모두 수행하는 반면 공연 입장권은 인가의 역할만 수행한다.

<br>

-   인증은 개체(사용자 또는 장치)의 신원을 증명하는 행위 <br>
-   인가는 개체에게 접근 권한을 부여하거나 거부하는 행위 <br>
-   인증은 인가 의사결정의 한 요소가 될 수 있다. <br>
-   인가 가공물(Token)로 개체의 신원을 파악하는 방법은 유용하지 않음 <br>

<br>

## **_Chapter8_** 영속화 데이터를 기록하고 다루기

Nest는 다양한 Database와 연결이 가능하며 RDBMS와 NoSQL Database도 가능하다. <br>

> 객체 관계 매핑(**_Object Relational Mapping_**)이란 Database의 관계를 객체로 바꾸어 개발자가 **_OOP_** 로 Database를 쉽게 다룰 수 있도록 해주는 **_도구_** 이다. <br>
> SQL Query를 그대로 코드에 기술하고 그 결과를 QuerySet으로 다루는 방식에서 세부 Query 문 **_추상_** 단계로 발전했다.

<br>

### TypeORM

```cmd
npm i typeorm @nestjs/typeorm mysql2
```

<br>

-   1:1 (**One-To-One**)

    -   @JoinColumn()은 FK가 있어야 하는 테이블에 설정해야 한다. <br>
    -   사용자 프로필 **Profile**

    ```typescript
    @Entity()
    export class Profile {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        address: string;

        @Column()
        introduce: string;

        @Column()
        married: boolean;
    }
    ```

    <br>

    -   사용자 **User**
    -   사용자 테이블에 **_profileId_** 컬럼 추가

    ```typescript
    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        email: string;

        @Column()
        password: string;

        @OneToOne(() => Profile)
        @JoinColumn()
        profile: Profile;
    }
    ```

<br>

### **Repository Pattern**

저장소 패턴(Repository Pattern)이란 Database와 같은 저장소를 다루는 로직을 Data Layer로 분리하여 핵심 비즈니스 로직에 집중할 수 있게 해준다. <br>

저장소는 Interface를 통해 Data를 처리하도록 추상화되어 있으므로 필요할 경우 데이터 저장소를 변경하기 쉽다는 장점이 있다. <br>

-   마틴 파울러 <엔터프라이즈 애플리케이션 아키텍처 패턴> <br>
    > 저장소는 도메인 모델 계층과 데이터 매핑의 중간자 역할을 하며 메모리 내의 도메인 개체 집합에 대해서도 동일한 방식으로 작업을 수행한다. <br>
    > Clinent Object는 Query를 선어적으로 빌드하고 저장소에 요청한다. <br>
    > 개념적으로 저장소는 Database에 저장되는 객체 집합과 수행하는 작업을 캡슐화하여 영속화 계층에 더 가까운 방법을 제공한다. <br>
    > 또한 저장소는 작업 도메인 및 데이터 할당 또는 매핑 간의 종속성을 명확하게 한 방향으로 구분하려는 목적을 지원한다. <br>

<br>

비즈니스 로직을 처리하는 클라이언트는 직접 데이터 소스를 다루지 않는다. <br>
저장소를 활용해 Entity Object를 영속화하고 저장소를 통해 데이터를 비즈니스 Entity 개체로 전달받는다. <br>
영속화와 Query Request와 Response를 가공하는 Repository는 데이터 소스에 맞는 구현체를 가진다. <br>
즉 데이터를 Dtabase에 저장하기 적합하게 Mapping하고 Query 결과를 Client가 원하는 방식으로 가공한다. <br>

> Database를 MySQL에서 PostgreSQL로 변경하고자 한다면 Client와 Interface는 그대로 두고 구현부만 적합하게 변경하면 된다. <br>

<br>

## **_Chapter9_** 요청 처리 전 부가 기능을 수행하기 위한 미들웨어

웹 개발에서 미들웨어의 의미란 Router Hanlder가 Client의 Request를 처리하기 전 수행되는 Component를 의미한다.

<br>

> Client => (HTTP Request) => Middleware => Router Handler(@RequestMapping)

<br>

Nest의 Middleware는 Express의 Middleware와 동일하게 동작하며 기능은 다음과 같다. <br>

-   어떤 형태의 코드라도 수행할 수 있다. <br>
-   Request와 Response에 변형을 가할 수 있다. <br>
-   Request와 Response에 주기를 끝낼 수 있다. (응답을 보내거나 에러 처리를 의미) <br>
-   여러 개의 Middleware를 사용한다면 next()를 호출해 Call Stack상 다음 Middleware에게 제어권을 전달해야한다. <br>

<br>

현재 사용되는 Middleware가 응답을 보내지 않는다고 하면 반드시 next()를 호출해야하며 다음과 같은 작업을 수행할 수 있다. <br>

-   Cookie Parsing <br>
    Cookie를 Parsing하여 사용하기 쉬운 Data Structure로 변경한다. 이를 이용해 Router Handler가 매번 Cookie를 Parsing하지 않아도 된다. <br>
-   Session <br>
    Session Cookie를 찾고 해당 Cookie에 대한 Session의 상태를 조회해 Request에 Session 정보를 추가한다. <br>
    이를 통해 다른 Handler가 Session 객체를 사용할 수 있다. <br>
-   Authentication Authorization
    사용자가 서비스에 접근 가능한 권한이 있는지 검증한다. <br>
    Nest에서는 인가 구현 시 Guard 사용을 권장한다. <br>
-   Body Parsing
    Body는 POST/PUT Request로 들어오는 JSON Type뿐만아니라 File Stream과 같은 Data도 있다. <br>
    해당 Data를 Type에 따라 읽고 해석 후 다음 Parameter에 넣는 작업을 한다. <br>

<br>

원하는 기능이 있다면 직접 Middleware 구현이 가능하다. <br>
예를 들어 Transaction Request가 필요할 경우 Transaction을 걸고 작업을 수행 후 Commit하는 Middleware를 구현할 수 있다.
Custom Middleware를 잘 만들면 Domain에 관심사를 집중할 수 있는 Application을 작성할 수 있다. <br>

<br>

#### **Logger Middleware**

Middleware는 일반 Function과 NestMiddleware Interface를 구현한 Class로 구현할 수 있다. <br>

```typescript
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunciton } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Reponse, next: NextFunction) {
        console.log("Middleware Execute");
        next();
    }
}
```

<br>

-   AppModule Class에서 NestModule을 implements하여 configure Method를 구현한다.

```typescript
import { MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./";

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes("/users"); // Path 설정 가능
    }
}
```

<br>

-   **MiddlewareConsumer** <br>
    configure Method에 인수로 전달된 **_MiddlewareConsumer_** 객체를 이용해 Middleware를 어떤 Router에 실행시킬지 관리할 수 있다. <br>
    **_apply_** Method에 원형은 다음과 같다.

```typescript
apply(...middleware: (Type<any> | Function)[]): MiddlewareConfigProxy
```

<br>

-   여러 개의 Middleware 사용 시 **_apply_** Method에 순서대로 나열

```typescript
consumer.apply(FirstMiddleware, SecondMiddleware).forRoutes("/users");
```

<br>

-   **_Controller_** Class 활용

```typescript
consumer.apply(LoggerMiddleware).forRoutes(UserController);
```

<br>

-   **_exclude_** 를 활용해 Middleware를 적용하지 않을 Router Path 설정

```typescript
consumer
    .apply(LoggerMiddleware)
    .exclude({ path: "/users", method: RequestMethod.GET })
    .forRoutes(UserController);
```

<br>

-   전역 설정 (Global)

```typescript
const app = await NestFactory.create(AppModule);

app.use(LoggerMiddleware);
```

<br>

> Function Middleware는 **_DI Container_** 를 사용할 수 없다 즉 Provider를 Injection 받아 사용할 수 없다.

<br>

## **_Chapter10_** 권한 확인을 위한 가드 JWT 인증/인가

Express에서 인증(**_Authentication_**) 과정은 **_Middleware_** 로 구현한다. Application은 사용자의 권한을 확인하기 위해 **_인증_**(Authentication)과 **_인가_**(Authorization)을 수행한다. <br>

인증은 사용자가 **_누구인지 증명_** 하는 과정이고 Client Header에 Token을 검증하여 확인한다. <br>  
인가는 인증을 통과한 사용자가 요청한 **_Resource_** 를 사용할 수 있는 **_권한_**(Permission, Role, ACL)이 있는지를 검증한다. <br>

> 인증과 인가가 실패할 경우 응답에 대한 HTTP Status Code는 401 Unauthorized, 403 Forbidden이다. <br>

Middleware는 실행 콘텍스트(**_ExectionContext_**)에 접근할 수 없어 인증 작업에 적합하지 않다. <br>
반면 Nest에서 권장하는 Guard는 실행 콘텍스트에 접근할 수 있어 다음 실행될 작업을 정확히 알고 있다.

<br>

### Guard를 이용한 인가

CanActivate Interface를 구현한다. <br>
canActivate Method는 ExectionContext를 인수로 받으며 ExectionContext는 **_ArgumentsHost_** 를 상속받고 Request와 Response에 대한 정보를 가지고 있다. <br>
현재는 HTTP 통신을 하고 있으므로 Interface에서 제공하는 Method 중 switchToHttp() Method를 사용해 필요한 Request를 가져올 수 있다. <br>

```typescript
import { CanActivate, ExecutionContext, Injectale } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<booelan> {
        const rquest = context.switchToHttp().getRequest();

        return this.validateRequest(request);
    }

    #validateRequest(request: any) {
        return true;
    }
}
```

```typescript
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    findUserById(@Param("id") id: number) {
        return this.userService.findUserById(id);
    }
}
```

<br>

-   Global Guard (main.ts)

```typescript
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalGuards(new AuthGuard());
}
```

<br>

### **인증**

사용자의 Resource를 보호하기 위해 Server에 접속하는 Client가 Resource의 주인인지 식별해야 하는 인증 절차를 거쳐야 한다. <br>
로그인 시점부터 로그아웃까지 사용자가 가진 권한 내에서 서비스를 이용할 수 있어야 한다. <br>
대표적인 인증 방식은 Token, Session 2가지가 있으며 요즘 표준은 Token이다.

<br>

1.  **Session** <br>
    로그인에 성공한 사용자가 서비스를 이용하는 동안 저장하고 있는 정보이다. <br>
    Session 생성 후 Server는 Memory 혹은 Database에 저장하며 이후 사용자의 요청에 포함된 Session을 통해 인증 과정을 거친다.

        <br>

    > 브라우저에는 Data를 저장할 수 있는 공간이 있다. <br>
    > 현재 브라우저를 닫거나 새로우 탭 또는 창을 열면 데이터가 삭제되는 Session Storage <br>
    > 창을 닫아도 데이터가 남아있는 Local Storage <br>
    > 간단한 데이터를 저장할 수 있는 Cookie

        <br>

    Session은 Server에 저장되므로 사용자가 몰렸을 경우 Server에 부하가 심해진다. <br>
    Cloud를 이용하면 Server와 Database를 유연하게 증설할 수 있지만 그 시간에 서비스가 중단될 수도 있다. <br>
    Redis와 같은 Infra를 이용해 In-Memory 방식으로 저장하는 방법도 있다. <br>
    서비스가 여러 도메인으로 분리돼있을 경우 CORS 문제로 도메인 간 Session을 공유하는 비용이 증가한다.

<br>

2. **Token** <br>
   사용자 로그인 시 Server에서 Token 생성 후 사용자에게 전달한다. <br>
   로그인 이후 Request에 대해 Client가 전달한 Token 검증만 수행한다. <br>
   Session과 같이 상태를 관리할 필요 없어 어느 도메인의 서비스로 보내더라도 같은 인증을 수행할 수 있다. <br>
   이를 확장해 Oauth 기반의 인증 방식도 구현할 수 있다. <br>

<br>

#### **Sliding Session** 과 **Refresh Token**

Stateless 방식인 Token을 사용하면 Server에 부담을 덜어줄 수 있지만 Token이 탈취되었을 경우 해당 Token을 무효화시키기 어렵다. <br>
이를 보완하기 위해 Token의 유효 기간을 짧게 설정하지만 이마저도 사용자가 매번 로그인해야하는 단점이 있다. <br>

Stateless 방식의 Token의 보안 취약점을 보강하고 사용자의 편의성을 유지하기 위해 Sliding Session을 사용한다. <br>
Sliding Session은 로그인 정보를 다시 입력하지 않고 현재 가지고 있는 Token을 새로운 Token으로 발급하는 방식을 의미한다. <br>

이를 활용하려면 사용자가 로그인하는 과정을 대신할 방법이 필요한데 이를 Refresh Token으로 구현한다. <br>
Refresh Token은 Access Token과 마찬가지로 Token을 사용할 수 있고 Access Token에 비해 유효기간이 매우 길다. <br>
최초 사용자 로그인 시 Access와 Refresh Token 모두 발급하고 Client는 Access Token 유효 기간 만료로 에러가 발생한 경우 Refresh Token을 이용하여 새로운 Access Token을 발급받는다. <br>

Refresh Token 또한 유효 기간 만료로 재발급 할 경우 가장 최근에 발급한 Refresh Token으로 새로운 Token을 발급받는다. (사용자는 항상 최신 Refresh Token) <br>
Refresh Token 탈취된다면 Access Token보다 유효 기간이 길어 보안에 취약점이 생기므로 Client는 반드시 안전한 공간에 보관해야한다. <br>

Access Token과 Refresh Token 만료 기간은 사용자의 패턴을 보고 적당한 기간으로 설정한다. <br>
Refresh Token은 보통 Database에 저장하고 Request에 포함된 Refresh Token과 비교한다. Stateless 방식의 장점이 약화되기는 했지만 Stateless 저장과 보안성 사용성을 위해 타협한 방식이다.

<br>

#### **Refresh Token Strategy**

Access Token은 만료 기간이 남은 Token을 여러 개 발급해 사용할 수 있지만 Refresh Token은 서비스 실행 중 유일하게 다뤄져야 한다. <br>

Refresh Token은 만료 기간이 길고 Acess Token을 언제든지 다시 얻을 수 있으므로 새로운 Refresh Token을 발급했을 경우 이전에 발급한 Token이 유효하지 않도록 해서 탈취된 Token이 만료 기간이 남았더라도 비정상 Token으로 인지할 수 있도록 해야한다. <br>

Refresh Token을 Database에 영속화하고 유효한지 여부를 따지는 컬럼을 생성할 수도 있다. <br>
이를 통해 공격자가 무작위로 Refresh Token을 생성했는지 아니면 과거에 유요하게 발급되었던 Token이 실제 사용되고 있는지 식별할 수 있다. <br>

<br>

#### **Custom Parameter Decorator**

<<<<<<< HEAD
<br>

-   **UserDecorator** <br>
    createParamDecorator를 이용해 User Decorator를 선언 <br>
    ExecutionContext에서 Request를 얻어온다. <br>
    Guard에서 설정(reqeust.user)한 사용자 객체를 반환한다. <br>
    req.uset가 any Type이었다면 Decorator를 만듬으로 UserMeta Type을 가지게되어 Type의 안정성도 누릴 수 있다.

        <br>

        ```typescript
        import { createParamDecorator, ExecutionContext} from "@nestjs/common"

        export const UserMeta = createParamDecorator(
            (data: unknown, ctx: ExecutionContext) => {
                const request = ctx.switchToHttp().getRequest()

                return request.user;
            }
        )

    =======
    | Nest Decorator | Express |
    | ------------------------ | ----------- |
    | @Request(), @Req() | req |
    | @Response(), @Res() | res |
    | @Next() | next |
    | @Session() | req.session |
    | @Param(param?: string) | req.params |
    | @Body(param?: string) | req.body |
    | @Query(param?: string) | req.query |
    | @Headers(param?: string) | req.headers |
    | @Ip() | req.ip |
    | @HostParam() | req.hosts |

<br>

-   **UserDecorator** <br>
    createParamDecorator를 이용해 User Decorator를 선언 <br>
    ExecutionContext에서 Request를 얻어온다. <br>
    Guard에서 설정(reqeust.user)한 사용자 객체를 반환한다. <br>
    req.uset가 any Type이었다면 Decorator를 만듬으로 UserMeta Type을 가지게되어 Type의 안정성도 누릴 수 있다.

    <br>

    ```typescript
    import { createParamDecorator, ExecutionContext } from "@nestjs/common";

    export const UserMeta = createParamDecorator(
        (data: unknown, ctx: ExecutionContext) => {
            const request = ctx.switchToHttp().getRequest();

            return request.user;
        },
    );
    ```

<br>

#### 추후 작성

-   Decorator 합성
-   Metadata(Reflection Class)

<br>

## **_Chapter11_** 로깅 애플리케이션의 동작 기록

<<<<<<< HEAD
서비스에 기능이 늘어나 규모가 커지면 기능에 동작 과정을 남기고 추적하는 일이 매우 중요하다. <br>

Issue가 발생했을 경우 해당 Issue만 보고 해결하는 건 많은 비용이 들고 코드를 역추적하는 과정은 매우 복잡하다. <br>
Issue 발생 지점과 Callstack이 제공된다면 신속한 조취가 가능하다. <br>

# Nest는 내장 Logger Class를 지원하며 다음과 같은 System Logging 동작을 제어할 수 있다. <br>

서비스에 기능이 늘어나 규모가 커지면 기능에 동작 과정을 남기고 **_추적_** 하는 일이 매우 중요하다. <br>

Issue가 발생했을 경우 해당 Issue만 보고 해결하는 건 많은 비용이 들고 코드를 역추적하는 과정은 매우 복잡하다. <br>
Issue 발생 지점과 CallStack이 제공된다면 **_신속한 조치_** 가 가능하다. <br>

Nest는 **_내장 Logger Class_** 를 지원하며 다음과 같은 System Logging 동작을 제어할 수 있다. <br>

> > > > > > > f360e7dc0ff3112449a08360829502a4394847e9

-   Logging 비활성화
-   Log Level: log, error, warn, debug, varbose
-   Logger의 Timestamp 재정의
-   기본 Logger 재정의(오버라이딩)
-   기본 Logger를 확장해 Custom Logger 작성
-   DI를 통해 손쉽게 Logger를 주입하거나 Test Module로 제공

<br>

-   **내장 로거** <br>
    Logger Instance는 Log를 남기고자 하는 부분에 직접 생성해 사용한다.

    ```typescript
    import { Injectable, Logger } from "@nestjs/common";

    @Injectable()
    export class UserService {
        private readonly logger = new Logger(UserService.name);

        findUserById() {
            this.logger.error("");
            this.logger.warn("");
            this.logger.log("");
            this.logger.verbose("");
            this.logger.debug("");
        }
    }
    ```

<br>

-   **커스텀 로거** <br>
    내장 로거는 File 또는 Database 저장 기능을 제공하지 않으므로 Custom Logger를 직접 구현할 수 있다. <br>
    Custom Logger는 @nestjs/common의 LoggerService Interface를 구현해야한다.

    <br>

    -   **logger.service.ts**

    ```typescript
    export class CustomLogger extends ConsoleLogger {
        error(message: any, stack?: string, context?: string) {
            super.error.apply(this, arguments);

            this.loggerExecution;
        }

        loggerExecution() {
            // Ddatabase Save Logic 등 Logger Logic
        }
    }
    ```

    <br>

    -   **logger.module.ts**

    ```typescript
    import { Module } from "@nestjs/common";
    import { CustomLogger } from "";

    @Module({
        providers: [CustomLogger],
        exports: [CustomLogger],
    })
    export class LoggerModule {}
    ```

    <br>

    -   **Global 설정**

    ```typescript
    async function bootstrap() {
        const app = await NestFactory.create(AppModule)

        app.useLogger(app.get(CustomLogger))
    ```

<br>

### Winston Logger

Nest 제공 Logger도 사용 가능하지만 상용 수준의 서비스에선 Log 출력뿐 아니라 File을 저장하거나 중요 Log는 Database에 저장해야 한다. <br>

이러한 기능을 Logger를 활용해 직접 구현하기엔 비효율적이므로 Winston을 사용한다. <br>
Winston은 **Logging Process** 를 **_분리_** 시켜 좀 더 유연하고 확장 가능한 Logging System 구축이 가능하다. <br>
**_Log Format_** 과 **_Level_** 을 유연하게 설정할 수 있다.

<br>

```cmd
npm i nest-winston winston
```

<br>

```typescript
import winston from "winston";
import {
    nestWinstonModuleUtilities,
    WinstonModule,
} from "nest-winston"

@Module({
    imports: [
        ...,
        WinstonModule.forRoot({
            transports: [                                           // transports Option 설정
                new winston.transports.Console({
                    level:
                        process.env.NODE_ENV === "production"       // 개발 환경별로 Log Level 설정
                            ? "info"
                            : "silly",
                    format: winston.format.combine(
                        winston.format.timestamp(),                 // Log Time 설정
                        utilities.format.nestLike("MyApp", {        // 어디에서 Log를 남기는지 구분하는 MyApp과 가독성을 위한 prettyPrint 설정
                            prettyPrint: true,
                        }),
                    ),
                }),
            ],
        }),
    ]
})
```

<br>

-   Winston이 지원하는 **Log Level**
    설정된 Log Level보다 높은 Log는 **_같이_** 출력된다. <br>
    ```javascript
    {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    }
    ```

<br>

## **_Chapter12_** 모든 건 항상 실패한다 예외 필터

서비스에서 예외(**_Exception_**) 처리는 필수 사항이다. 어떤 상황이던 에러는 발생할 수 있으며 개발자는 에러에 대응책을 마련해야 한다. <br>

장애 또는 예외가 발생할 만한 모든 부분에 예외 처맄 코드를 삽입하는 건 **_중복 코드를 양산_** 할 뿐만 아니라 기능 구현과 관련 없는 코드가 삽입되므로 **_비즈니스 로직_** 에 집중하기 어렵다. <br>
예외 발생 시 **_Log_** 와 **_CallStack_** 을 남겨 Debug에 사용할 수 있는 별도의 Module을 작성했다면 에러 처리기 역시 따로 만들어 공통으로 관리해야 한다.

<br>

### **예외 처리**

Nest는 Framework 내부에 **_Exception Layer_** 를 두고있다. <br>
Application을 통틀어 제대로 처리되지 않은 예외를 처리하는 역할을 한다. <br>

기본적으로 Nest는 예외에 대한 많은 Class를 제공하며 에러 발생 시 응답 형식을 JSON으로 변경해 준다. <br>
이는 기본으로 내장된 **_Global ExceptionFilter_** 가 처리한다. <br>

내장 예외 필터는 인식할 수 없는 에러(HttpException도 아니고 HttpException을 상속받지도 않은 에러)를 **_InternalServerErrorException_**(500) 으로 반환한다.

<br>

> InternalServerErrorException: 요청을 처리하는 과정에서 서버가 예상하지 못한 상황

<br>

InternalServerErrorException는 HttpException을 상속받고 HttpException은 **_자바스크립트의 Error_** 를 상속받는다. <br>
결국 모든 에러는 **_Error Object_** 로부터 파생된다.

<br>

그 외 Nest 기본 제공 ExceptionFilter는 HttpException을 상속받으며 해당 Class를 사용해 적절한 예외를 던진다(throw). <br>
적절한 예외 처리는 Client에서 에러를 쉽게 **_이해하고 대처_** 할 수 있도록 한다.

<br>

-   **HttpException Class** <br>
    생성자(constructor)는 **_response_**, **_status_** 2개의 인수를 받는다. <br>
    response: JSON 응답의 본문이다. 문자열 또는 Record<string, any> 타입의 객체를 전달할 수 있다 <br>
    status: 에러의 속성을 나타내는 HTTP Status Code <br>
    JSON 읃답의 본문은 statusCode와 message 속성을 기본으로 가진다. <br>
    ```typescript
    export declare class HttpException extends Error {
        constructor(response: string | Record<string, any>, status: number);
    }
    ```

<br>

-   **BadRequestException**

    ```typescript
    import { BadRequestException } from "@nestjs/common/exceptions";

    throw new BadRequestException("message", "description");
    ```

<br>

-   Nest에서 제공하는 예외 클래스의 생성자는 다음과 같은 모양을 가진다. <br>

    ```typescript
    constructor(objectOrError?: string | object | any, description: string);
    ```

<br>

### **예외 필터**

Nest에서 제공하는 Global 예외 필터 외에 직접 ExceptionFilter Layer를 두어 원하는 대로 예외 처리를 다룰 수 있다. <br>
예외가 일어날 경우 Log를 남기거나 Response Object를 원하는 대로 변경하는 등 요구 사항을 해결할 경우 사용한다. <br>

-   예외 발생 시 예외를 잡고 Request URL과 Timestamp를 출력

    ```typescript
    import {
        ArgumentHost,
        Catch,
        ExceptionFilter,
        HttpException,
        internalServerErrorException,
    } from "@nestjs/common";
    import { Request, Response } from "express";

    @Catch() // @Catch Decorator: 처리되지 않은 모든 Exception을 Catch
    export class HttpExceptionFilter implements ExceptionFilter {
        catch(exception: Error, host: ArgumentHost) {
            const ctx = host.switchToHttp();
            const req = ctx.getRequest<Request>();
            const res = ctx.getResponse<Response>();

            if (!(exception instanceof HttpException)) {
                // Nest의 Built-in Error는 HttpException을 상속 받는다
                exception = new InternalServerErrorException(); // HttpException이 아닌 예외는 알 수 없는 Error이므로 InternalServerErrorException
            }

            const response = (exception as HttpException).getReponse();

            const log = {
                timestamp: new Data(),
                url: req.url,
                response,
            };

            return res
                .status(exception as HttpException)
                .getStatus()
                .json(repsonse);
        }
    }
    ```

<br>

-   다음과 같이 Application Global 설정을 할 경우 예외 필터의 동작이 main.ts에서 이뤄지므로 필터에 **_의존성 주입_** 을 할 수 없다. <br>

    ```typescript
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.useGlobalFilters(new HttpExceptionFilter()); // 전역
    }
    ```

-   해결을 위해 **_Custom Provider_** 등록

    ```typescript
    import { Module } from "@nestjs/common"
    import { APP_FILTER } from "@nestjs/core"

    @Module({
        providers: [
            {
                provide: APP_FILTER,
                useClass: HttpExceptionFilter,
            }
        ]
    })
    export class
    ```

<br>

## **_Chapter13_** 인터셉터로 요청과 응답을 알맞게 바꾸기

Interceptor는 Request, Response를 가로채 변형을 가할 수 있는 **Component** <br>
AOP(Aspect Oriented Programing) 프로그래밍에서 영향을 받았으며 다음과 같은 기능을 수행할 수 있다. <br>

-   Method 실행 전/후 추가 로직을 Binding <br>
-   Function에서 반한된 결과를 변환 <br>
-   Function에 throw된 Exception을 변환 <br>
-   기본 기능의 동작을 확장 <br>
-   특정 조건에 따라 기능을 완전히 재정의(캐싱)

<br>

Interceptor는 Middleware와 동일한 기능을 수행하지만 수행 시점(**_LifeCycle_**)에 차이가 있다. <br>
Middleware는 Handler에 전달되기 전 동작하고 Interceptor는 Handler 전/후 호출되어 Request, Response를 다룰 수 있다. <br>

-   **LoggingInterceptor** <br>

    ```typescript
    import {
        Injectable,
        NestInterceptor,
        ExecutionContext,
        CallHandler,
    } from "@nestjs/common";
    import { Observable } from "rxjs";
    import { tap } from "rxjs/operators";

    @Injectable()
    export class LoggingInterceptor implements NestInterceptor {
        // NestInterceptor Interface를 구현한 Class
        intercept(
            context: ExecutionContext,
            next: CallHandler,
        ): Observable<any> {
            // NestInterceptor Interface의 intercept Method
            // Request Before
            console.log("Before Execute"); // Request Handler 전달 전 실행 로직

            // Response After
            const now = new Data();

            return next.handle().pipe(
                tap(() => console.log("After Execute")), // Response 후 실행 로직
            );
        }
    }
    ```

<br>

-   Global Interceptor <br>
    ```typescript
    await function bootstrap() {
        app.useGlobalInterceptors(new LoggingInterceptor());
    };
    ```

<br>

-   NestInterceptor의 구현부 <br>
    **ExecutionContext**: 현재 실행 콘텍스트

    <br>

    **CallHandler**: handle() Method를 구현하며 handle() Method는 Router Handler에서 전달된 **_Response Stream_** 을 돌려주고 RxJS의 **_Observable_** 로 구현되어 있다. <br>
    handle()를 호출하지 않으면 Router Handler가 동작하지 않을 수도 있다. <br>
    handle()를 호출하고 Observable을 수신한 후 Response Stream에 추가 작업을 수행하는 방식 <br>

    <br>

    ```typescript
    export interface NestInterceptor<T = any, R = any> {
        intercept(
            context: ExecutionContext,
            next: CallHandler<T>,
        ): Observable<R> | Promise<Observable<R>>;
    }

    export interface CallHandler<T = any> {
        handle(): Observable<T>;
    }
    ```

<br>

### Lifecycle

요청 생명주기(Request Lifecycle) 또는 요청/응답 생명 주기는 들어온 Request가 어떤 Component를 거쳐 처리되고 생성된 응답은 또 어떤 Component를 거쳐 처리되는지를 의미한다. <br>
개발 시 Debug나 Application의 동작을 이해하려면 Lifecycle은 필수로 알아야 한다. <br>

Nest의 Request Lifecycle 순서는 다음과 같다.

<br>

1. Middleware <br>
   Middleware의 실행 순서는 정해져 있다. <br>
   가장 먼저 **_Global Binding Middleware_** 가 실행된다. <br>
   이후 Module에 Binding 되는 **_순서대로_** 실행되며 다른 Module에 Binding 되어있는 Middleware들이 있다면 먼저 RootModule에 Binding된 Middleware를 실행하고 imports에 정의한 순서대로 실행된다.

<br>

2. Guard <br>
   가장 먼저 Global Binding Guard가 실행된 후 **_Controller에 정의_** 된 순서대로 실행된다. <br>
   Guard1 => Guard2 => Guard3

    ```typescript
    @UseGuards(Guard1, Guard2)
    @Controller("users")
    export class UserController {
        constructor(private userService: UserService) {}

        @UseGuards(Guard3)
        @Get()
        getUserList() {}
    }
    ```

<br>

3. Interceptor <br>
   Guard의 실행 순서와 유사하다. Interceptor는 RxJS의 Observable 객체를 반환하는데 이는 Request의 실행 순서와 반대로 동작한다. <br>
   즉 요청은 Global => Controller => Router 순서대로 동작하지만 응답은 Router => Controller => Global 순으로 동작한다. <br>

<br>

4. Pipe <br>
   Pipe가 여러 Level에 적용되어 있다면 **_순서대로_** 적용된다. 특이점은 Pipe가 적용된 Router의 매개변수가 여러 개 있을 경우 정의한 순서의 **_역순_** 으로 적용된다. <br>
   updateUser Method에는 Pipe가 둘 다 적용되어 있는데 GeneralValidationPipe => RouteSpecificPipe 순으로 동작한다. <br>
   updateUser Method 매개 변수는 query => params => body 순으로 동작한다. <br>

    ```typescript
    @UsePipes(GeneralValidationPipe)
    @Controller("users")
    export class UserController {
        constructor(private readonly userService: UserService) {}

        @UsePipes(RouteSpecificPipe)
        @Patch(":id")
        updateUser(
            @Body() body: UpdateUserDto,
            @Param() params: UpdateUserParams,
            @Query() query: UpdateUserQuery,
        ) {}
    }
    ```

<br>

5. ExceptionFilter <br>
   유일하게 예외 필터는 Global ExceptionFilter가 먼저 적용되지 않는다. <br>
   Router => Contropller => Global 순으로 Binding된 순서대로 동작한다. <br>
   Filter가 예외를 잡으면(Catch) 다른 Filter가 동일한 예외를 잡을 수없다.

<br>

> 1. Middleware (Global => Module) <br>
> 2. Guard (Global => Controller => Router) <br>
> 3. Interceptor (Global => Controller => Router) <br>
> 4. Pipe (Global => Controller => Router) <br>
     >    Controller <=> Service <br>
> 5. Interceptor (Global => Controller => Router) <br>
> 6. ExceptionFilter (Global => Controller => Router)

<br>

## **_Chapter14_** 태스크 스케줄링

서비스 개발 시 주기적으로 동일한 작업을 반복적으로 처리해야 하는 경우가 생긴다. <br>
예를 들어 유료 서비스 구독 시 매월 정기적으로 결제가 이루어져야 하는데 이런 반복 작업을 태스크(**_Task_**) 또는 배치(**_Batch_** 일괄 처리) 부른다. <br>

태스크 스케줄링은 반드시 반복적인 작업에만 적용해야 하는 건 아니다. 다음 달 아침에 메일을 발송하는 1회성 태스크를 만들수도 있다. <br>
대표적으로 Linux에 Cron이 있으며 Nest에는 node-cron을 통합한 **_@nestjs/schedule_** 패키지가있다.

<br>

```cmd
npm i @nestjs/schedule @types/cron
```

<br>

태스크 스케줄링은 @nestjs/schedule 패키지에 포함된 ScheduleModule을 사용하며 바로 AppModule에서 사용해도 되지만 별도의 Module을 생성한다.

<br>

-   **Batch Module** <br>
    ScheduleModule은 **_forRoot Method_** 를 통해 가져오며 이 과정에서 Nest는 스케줄러를 초기화하고 Application에 선언한 **_CronJob_**(Task), **_Timeout_**, **_Interval_** 을 등록한다. <br>
    Timeout은 스케줄링이 끝나는 시각, Interval은 주기적으로 반복되는 시간 가격 <br>
    태스크 스케줄링은 모든 Module이 예약된 작업을 로드하고 확인하는 onApplicationBootstrap 생명주기 Hook이 발생할 경우 등록된다. <br>
    ScheduleModule에는 Task를 등록하는 방법이 여러 가지 존재한다.

    <br>

    ```typescript
    import { Module } from "@nestjs/common";
    import { ScheduleModule } from "@nestjs/schedule";
    import { TaskService } from "";

    @Module({
        imports: [ScheduleModule.forRoot()],
        providers: [TaskService],
    })
    export class BatchModule {}
    ```

<br>

### Task Schedule 선언 방식

1. **CronJob** <br>
   @Cron Decorator를 선언한 Method를 Task로 구현한다. <br>
   @Cron의 처음 인수는 Task의 반복 주기이며 Cron Pattern을 따른다. <br>
   공백으로 구분된 6개의 값을 가지는 문자열을 입력받고 각 자리별 의미는 다음과 같다. <br>

   > Second: 초, 0~59의 값을 가지며 선택 사항 <br>
   > Minute: 분, 0~59의 값을 가짐 <br>
   > Hour: 시간, 0~23의 값을 가짐 <br>
   > day of month: 날, 1~31의 값을 가짐 <br>
   > month: 월, 0~12의 값을 가지며 0과 12는 12월 <br>
   > day of week: 요일, 0~7의 값을 가지며 0과 7은 일요일 <br>

    ```typescript
    import { Injectable, Logger } from "@nestjs/common";
    import { Cron } from "@nestjs/schedule";

    @Injectable()
    export class TaskService {
        private readonly logger = new Logger(TaskService.name);

        @Cron("* * * * * *", { name: "cronTask" })
        handleCron() {
            this.logger.log("Task Called");
        }
    }
    ```

<br>

| Pattern           | Description                        |
| ----------------- | ---------------------------------- |
| \* \* \* \* \* \* | 초마다                             |
| 45 \* \* \* \* \* | 매분 45초에                        |
| 0 10 \* \* \* \*  | 매시간, 10분에                     |
| 0 /30 9-17 \* \*  | 오전 9시부터 오후 5시까지 30분마다 |
| 0 30 11 \* \* 1-5 | 월~금 오전 11시 30분에             |

<br>

2. **Interval** <br>
   테스크 수행 함수에 @Interval() Decorator를 사용할 수 있다. 인수로 Task Name, Timeout(MS) <br>
    ```typescript
    @Interval("intervalTask", 3000)
    handleInterval() {
        this.logger.log("Task Called By Interval");
    }
    ```

<br>

3. **Timeout** <br>
   Application 실행 후 Task가 한번 실행되며 @Timeout() Decorator를 사용하며 인수는 Interval과 동일하다. <br>
    ```typescript
     @Timeout("timeoutTask", 5000)
     handleTimeout() {
         this.logger.log("Task Called By Timeout");
     }
    ```

<br>

### Dynamic Task Scheduled

<br>

## **_Chapter15_** 헬스 체크 댁의 서버는 건강하신가요

서비스 운영 시 트래픽이 늘어나거나 Database에 부하가 생기기도 하고 심지어 기간 통신망이 끊어지기도 한다. <br>
장애는 **_어떤 Layer_** 에서 발생할 수 있으며 사용자의 불편을 줄이기 위해 최대한 신속하게 대응해야 한다. <br>
이를 위해 서버의 상태를 주기적으로 체크하는 행위를 **_Health Check_** 라고 부른다. <br>

서버는 Http, Database, Memory, Disk 등의 상태를 체크하는 Health Check 장치가 있어야 한다. <br>
Health Check 중 이상 현상이 발견되면 즉시 담당자에게 알람이 가야 하며 서비스에 맞는 적절한 알람 발신 기준 세워야 한다.

<br>

> 예를 들어 10분간 응답 성공률이 95% 이하일 경우 담당자에게 알림 발신

<br>

Nest는 Terminus(**_@nestjs/terminus_**) Health Check 라이브러리르 제공한다. <br>
Terminus는 끝단, 종점을 의미하며 서비스 마지막 부분까지 **_정상 작동_** 하는지 확인한다는 의미다. <br>
다양한 상태 표시기를 제공하고 필요하다면 Custom 할 수 있다.

<br>

@nestjs/terminus가 제공하는 상태 표시기는 다음과 같다. <br>

-   HttpHealthIndicator <br>
-   MongooseHealthIndicator <br>
-   TypeOrmHealthIndicator <br>
-   SequelizeHealthIndicator <br>
-   MicroserviceHealthIndicator <br>
-   MemoryHealthIndicator <br>
-   GRPCHealthIndicator <br>
-   DiskHealthIndicator

<br>

### **Terminus**

```cmd
npm i @nestjs/terminus
nest g controller health-check
```

<br>

상태 확인은 특정 Router Endpoint(@GET() /healtch-check)에 **_Request_** 를 보내고 **_Response_** 를 받아 확인하는 방법을 사용한다.

<br>

```typescript
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "";

@Module({
    imports: [TerminusModule],
    providers: [HealthCheckController],
})
export class AppModule {}
```

<br>

### **Health Check**

HttpHealthIndicator는 동작 과정에서 **_@nestjs/axios_** 에 의존한다.

<br>

```cmd
npm i @nestjs/axios
```

```typescript
import { HttpModule } from "@nestjs/axios";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckController } from "";

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthCheckController],
})
export class AppModule {}
```

```typescript
import { Controller, Get } from "@nestjs/common";
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
} from "@nestjs/terminus";

@Controller("health-check")
export class HealthCheckController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck("NestJS", "https://docs.nestjs.com"),
        ]);
    }
}
```

<br>

-   **Repsonse**

```json
{
    "status": "ok",
    "info": {
        "NestJS": {
            "status": "up"
        }
    },
    "error": {},
    "details": {
        "NestJS": {
            "status": "up"
        }
    }
}
```

<br>

-   위 응답은 다음과 같은 **_HealthCheckResult_** Type을 가지고 있다.

    ```Typescript
    export interface HealthCheckResult {
        // 헬스 체크를 수행한 전반적인 상태 ("error" | "ok" | "shutting_down")
        status: HealthCheckStatus

        // 상태 "up" 정보
        info?: HealthIndicatorResult

        // 상태 "down" 정보
        error?: HealthIndicatorResult

        // 모든 상태 정보
        details: HealthIndicatorResult
    }
    ```

<br>

## **_Chapter16_** CQRS를 이용한 관심사 분리

CQRS(**_Command Query Responsibility Separation_**) Pattern은 **_명령_**(Command)과 **_조회_**(Query)를 분리해 **_성능_** 과 **_확장성_** 및 보안성을 높일 수 있도록 하는 아키텍처 패턴이다. <br>
요구 사항이 복잡해질수록 Domain Model 역시 복잡해진다.

<br>

데이터를 조회한 쪽에서는 현재의 복잡한 모델 구조의 데이터가 필요하지 않은 대부분이므로 조회 시 Modle과 Data를 업데이트할 시 Model을 다르게 가져가도록 하는 방식이다. <br>

조회는 CRUD에 Read를 의미하며 **_Resource_** 를 조회한 결과만을 반환하므로 시스템의 상태를 변경하지 않고 부작용이 없다. <br>
명령은 Create, Update, Delete 요청과 같이 시스템의 상태를 변경한다.

<br>

**_Martin Fowler_** 는 CQRS를 도입하면 다음과 같은 **_이점_** 이 있다고 한다. <br>

1. **_복잡한 Domain_** 을 다루기 더 쉬운 경우 <br>
   CQRS를 사용하면 복잡성이 추가되 생산성이 감소한다. Model을 공유하는 게 Domain을 다루기 더 쉬운지 면밀히 판단해야 한다. <br>
   System 전체가 아닌 도메인 주도 설계(DDD)에서 말하는 **_Bounded Context_** 내에서만 사용해야 한다.

<br>

2. 고성능 처리가 필요한 Application을 다루는 경우 <br>
   CQRS를 사용하면 Read, Write 작업에 로드를 분리해 각각을 독립적으로 확장할 수 있다. <br>
   성능을 위해 쓰기는 RDB로 읽기는 Document DB를 사용하는 경우도 많다. <br>
   Application에서 읽기와 쓰기 사이에 큰 성능 차이가 있는 경우 CQRS를 쓰면 편리하며 양쪽에서 서로 다른 최적화 전략을 사용할 수 있다.

<br>

3. CRUD를 통해 상호작용하는 단일 표현(Representation)에서 작접(Task) 기반 UI로 쉽게 이동한다. <br>
   예를 들어 ReservationStatus를 RESERVED로 설정이라는 명령을 "룸 예약"으로 변경한다.

<br>

4. 이벤트 소싱을 쉽게 활용해 **_Event Driven Programing_** 과 궁합이 좋다.

<br>

5. **_최종 일관성_**(Eventually Consistent)을 사용할 가능성이 높아진다. <br>

6. Domain을 사용할 경우 Update 시 많은 로직이 필요하므로 **_EagerReadDerivation_** 을 사용해 Query 측 Model을 단순화하는 게 합리적일 수 있다.

<br>

7. Write Model이 모든 Update에 대한 Event를 생성하는 경우 Read Model을 별도로 구성해 과도한 Database 상호작용을 피할 수 있다.

<br>

8. CQRS는 복잡한 Domain을 다루고 **_DDD_** 를 적용하는데 적합하다.

<br>

### **적용**

```cmd
npm i @nestjs/cqrs
```

<br>

CRUD는 Create, Update, Delete는 Command를 이용해 처리한다. Command는 Service, Controller, Gateway에서 직접 발송할 수 있다. <br>
전송한 Command는 Command Handler가 받아서 처리한다.

<br>

<hr>

<br>

## **_Chapter17_** 클린 아키텍처

아키텍처는 점차 나은 방향으로 발전했으며, Application 아키텍처에도 유행이 있다. <br>

클린 아키텍처는 **_Clean Code_** 의 저자 로버트 C. 마틴이 제안한 아키텍처이며 기존의 **_양파(Onion) 아키텍처_** 라고 불리던 아키텍처에서 발전한 형태이다. <br>
Software를 여러 **_동심원 Layer_** 로 나누고 각 Layer에 있는 Component는 안쪽 원에 있는 Component에만 **_의존성_** 을 가지도록 한다. <br>
따라서 안쪽 원에 존재하는 Component는 바깥 원에 독립적이다.

<br>

해당 책에서는 클린 아키텍처를 4개로 분류하며 가장 바깥쪽 Layer부터 **_인프라스트럭처_**(InfraStructure), **_인터페이스_**(Interface), **_애플리케이션_**(Application), **_도메인_**(Domain)이다. <br>
해당 이름은 정해진 바는 없으며 저자가 재직 중인 회사에서 **_직관적_** 으로 이해할 수 있게 작성했다. <br>

1. **InfraStructure** <br>
   Application에 필요하지만 개발자가 직접 작성한 게 아닌 **_외부_** 에서 가져다 쓰는 Component를 의미한다. <br>
   Database, Email Transport, 다른 서비스와의 통신 프로토콜 **_구현체_** 등 외부에서 제공하는 Interface나 라이브러리를 이용해 Application에 맞게 사용한 구현체가 포함된다.

<br>

2. **Interface** <br>
   Application이 제공하는 Interface가 구현되는 레이어다. <br>
   Controller는 Request와 Response에 형태를 제공한다. Gateway, 프레젠터와 같은 Component도 외부와의 Interface를 담당한다.

<br>

3. **Application** <br>
   Service 레이어가 해당되며, **_비즈니스 로직_** 이 구현되는 레이어다.

<br>

4. **Domain** <br>
   Application의 Domain을 구현하는 핵심 레이어다. <br>
   Domain 레이어는 다른 레이어에 의존하지 않으며, **_핵심 요소_** 만 가진다. <br>
   Domain 레이어의 Component가 변경되면, 이를 이용하는 모든 레이어를 수정해야 하므로 **_신중하게_** 작성해야 한다.

<br>

각 레이어는 의존성이 안쪽으로 향한다. <br>
하지만 구현을 하기 위해 안쪽 원에서 바깥 원의 구현체가 필요한 경우가 있다. <br>
이런 경우 구현체가 변경되면 같이 수정이 이뤄져야 하므로 독립적이지 않다.
특히 InfraStructure는 기존 Component를 변경할 경우가 종종 있다. (MySQL => PostgreSQL) <br>

의존성이 역전되는 경우 안쪽 레이어에서는 그 레이어 내에서 Interface를 정의하고, Interface를 구현한 구현체는 바깥 레이어에 둠으로써 의존성이 역전되지 않도록 할 수 있다.

<br>

### **은탄환은 없다** (프레더릭 브룩스)

    클린 아키텍처가 만능은 아니다.
    레이어를 4개로 나누고 각 레이어로 책임을 분리하게 되면 작성할 코드 양이 많아진다.
    테스트 코드를 작성한다면 따라서 테스트 코드의 양도 늘어난다. 코드 양이 늘어난다고 해서 Software의 복잡성이 떨어진다는 의미는 아니다.
    오히려 레이어 별로 **_분리_** 되어 있으므로, **_직관성_** 이 증가해 이해하기 쉬운 코드가 된다.
    하지만 작은 변경 사항이나 추가 기능 구현에도 시간이 오래 걸리는 단점이 존재한다.
    만약 간단한 MVP(**_Minimum Viable Product_**)를 만들어 아이디어를 **_빠르게_** 검증해 보고 싶다면 적합하지 않은 아키텍처일 수 있다.
    MVP 구조가 제품의 구조가 되는 경우가 많으므로 시간 압박에 의해 상용 서비스의 품질을 떨어뜨리는 실수를 하지 말아야 한다.

<br>

<details>
<summary><strong>SOLID</strong></summary>
<div markdown="1">

### **SOLID 객체 지향 설계 원칙**

SOLID 객체 지향 설계 원칙은 **_클린 아키텍처의 바탕_** 이다. SOLID 원칙은 로버트 C. 마틴이 객체 지향 언어로 Software를 설계할 경우 방법론을 체계적으로 정리한 이론이다. <br>
SOLID 원칙을 적용한다면 Application의 규모가 커질수록 더욱더 유지 보수성이 좋아지며, 읽기 쉬운 코드가 된다. <br>
SOLID의 각 원칙은 서로 분리되어 있는 게 아니라 같이 **_조합_** 해야 더 나은 Software 구조를 갖출 수 있다.

<br>

1. 단일 책임 원칙 **SRP**(Single Responsibility Principle) <br>
   하나의 Class는 **_하나의 책임_** 만 가져야 한다. Class가 변경되는 이유는 단 한 가지뿐 이어야 한다. <br>
   객체 지향 언어를 배울 경우 항상 접하는 내용이며 여기서의 Class는 Class 자체를 의미하는 거라기보다 Function, Object 등 최소 동작의 단위가 되는 개념을 포함한다. <br>
   코드를 작성하다 보면 어느새 하나의 Class가 비대해지는 경우가 발생하기도 하는데 Class를 크기가 작고 적은 책임을 가지도록 작성해야 변경에 유연하게 대처할 수 있다. <br>
   크기가 큰 Class는 다른 Class와의 의존성이 증가하게 되므로 변경 비용이 더 커지게된다.

<br>

2. 개방 폐쇄 원칙 **OCP**(Open Closed Principle) <br>
   Software 요소는 **_확장_** 에는 열려있고 **_변경_** 에는 폐쇄적이어야 한다. <br>
   상반된 두 개념이 동시에 존재한다고 생각할 수 있지만, Software의 요구 사항이 추가되었다고 해서 기존의 코드를 계속 수정해야 한다면 요구 사항이 늘어날수록 유지 보수가 매우 힘들어진다. <br>
   즉 새로운 기능이 기존 코드에 영향을 끼치지 않도록 하는 구조가 필요한데 **_OCP_** 는 **_Interface_** 를 활용해 쉽게 달성할 수 있다. <br>
   필요 기능은 구현체에 의존하지 말고 Interface에 의존해야 하며, 기능 추가 시 Interface를 추가한다.

<br>

3. 리스코프 치환 원칙 **LSP**(Liskov Substitution Principle) <br>
   Application Object는 Application의 정확성을 해치지 않으면서 하위 타입의 **_Instance_** 로 변경할 수 있어야 한다. <br>
   객체 지향 언어의 장점이 LSP로 발현된다. 상속 관계에서 자식 Class의 Instance는 부모 Class로 선언된 함수의 인수로 전달할 수 있다. <br>
   실제 동작하는 Instance는 Interface가 제공하는 기능을 구현한 객체이지만 Interface를 사용하는 다른 객체에도 전달할 수 있다. <br>
   실제 구현체인 자식 Instance는 언제든지 부모 또는 Interface가 제공해야 하는 기능을 제공하는 다른 구현체로 바꿀 수 있다. <br>

<br>

4. 인터페이스 분리 원칙 **ISP**(Interface Segregation Principle) <br>
   특정 Client를 위한 Inteface 여러 개가 범용 Interface 하나 보다 좋다. <br>
   하나의 Interface에 의존하게 되면 Interface에 기능이 추가될 경우 Interface를 구현하는 모든 Class를 수정해야 한다. <br>
   Interface를 **_기능별로 나누어_** 특정 Client 용 Interface로 모아 사용하는 게 변경에 대해 의존성을 낮추고 유연하게 대처할 수 있다.

<br>

5. 의존관계 역전 원칙 **DIP**(Dependency Inversion Principle) <br>
   구체화보다 **_추상화_** 에 의존해야 한다. <br>
   DIP는 DI(**_Dependency Injection_**)와 연관이 있다. 클린 아키텍처를 구현하기 위해 **_의존관계 역전_** 이 발생하기 마련이다. <br>
   이를 해소하기 위해 DI를 이용해야 하며 보통 DI는 Framework에서 내장돼있거나 DI를 구현할 수 있는 라이브러리를 사용한다.

<br>

    Class, Interface를 어느 정도 잘게 나누고, 역할을 분리해야 하는지에 대한 정답은 존재하지 않는다.
    System 발전에 따라 영향도는 낮추고 응집도는 높이는 방향으로 끊임없이 리팩토링 해야한다.

</div> 
</details>

<br>

<details>
<summary><strongs>공통 관심 사항과 관점 지향 프로그래밍</strongs></summary>
<div markdown="1">

1. **공통 관심 사항** (Cross Cutting Concern) <br>
   Application 에는 Logging과 같은 기본적인 기능과 Transaction과 같은 보안 관련 기능에 이르기까지 서비스 전반에 걸쳐 적용되는 공통 기능이 존재한다. <br>
   이러한 공통 기능은 특정 Module에만 쓰이는 게 아닌, 여러 Module에서 사용된다. <br>
   공통 기능은 비즈니스 로직과는 구분되는 기능이며, 이러한 기능을 공통 관심 사항이라고 부른다.

<br>

2. **관점 지향 프로그래밍** (Aspect Oriented Programming) <br>
   공통 관심 사항은 객체 지향 프로그래밍에 **_상속_**, **_위임_** 을 통해 여러 Module에 적용할 수 있지만 중복 코드가 양산된다는 한계점이 존재한다. <br>
   이러한 한계점을 효율적으로 극복하기 위해, AOP(Aspect Oriented Programming) 기법을 사용한다. <br>

   문제를 바라보는 관점으로 프로그래밍하며, <br>
   문제 해결을 위한 핵심 관심 사항과 서비스 전체에 적용되는 공통 관심 사항을 기준으로 나눔으로써, 공통 기능을 여러 Module에 쉽게 적용한다.

<br>

</div>
</details>

### 이벤트

<br>

## **_Chapter18_** 테스트 자동화

버그 없는 **_Software_**는 존재하지 않는다. <br>
코드가 몇 줄 되지 않는 간단한 프로그램이라 할지라도 그 프로그램이 수행되는 시스템이나 환경에 따라 제대로 동작하지 않을 가능성은 얼마든지 존재한다. <br>
실제 상용 서비스와 같이 복잡한 프로그램이 같이 맞물려 돌아가는 System은 실제 보이지 않는 버그들이 숨어 있으며, 개발자와 사용자 모두를 괴롭힌다. <br>

모든 Software는 Release 전 Test를 통과해야 한다. 일반적으로 품질 보증(Quality Assurance), QA라 불리는 테스트를 진행한다. <br>
이러한 테스팅 과정은, 프로그램의 버그가 없다고 확신하는 게 아닌, Software의 품질이 사용자에게 전달될 정도의 수준이 되었다는 걸 보증하는 보증한다. <br>
따라서, 테스트로 모든 버그를 발견할 수도 없고 그 과정 중 발견한 모든 버그를 수정할 필요는 없다. <br>
가능한 일정 내에 사용자에게 가치를 전달할 수 있는 수준으로 만든다는 마인드가 좋다. <br>

개발 단계에 따른 분류로 V-Model을 사용한다. <br>
보통 업무의 진행은 좌상단 요구 사항 분석을 시작으로 시스템 설계, 아키텍처 설계, 모듈(상세) 설계, 코딩 순으로 진행된다. <br>

테스팅 과정은 각 단계와 대응되는 테스트 과정을 역순으로 수행한다. <br>
이러한 개발 방법론이 폭포수 Model로서 현대 개발 방법론에 적합하지 않다고 생각할 수 있지만 해당 과정을 소수의 백로그로 이터레이션마다 애자일하게 수행한다.

<br>

| 개발 단계      | 테스트 종류   | 내용                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 요구 사항 분석 | 인수 테스트   | 알파, 베타 테스트와 같이 실사용 환경에서의 문제를 확인한다. 인수 테스트의 목적은 시스템을 운영 환경에 배포할 준비가 되었는가를 확인한다.                                                                                                                                                                                                                                                                                                                                                                                                               |
| 시스템 설계    | 시스템 테스트 | 소프트웨어가 구동되는 환경의 제약 사항으로 인해 발생하는 문제를 찾기 위한 테스트로 다음과 같은 방식이 있다. <br/> - 회복 테스트: 정전 등과 같은 유사 상황 발생시 자동 초기화, 데이터 회복이 제대로 되는지 확인한다. <br/> - 보안 테스트: 해킹 공격에 안전한지 확인한다. <br/> - 강도 테스트: 급격한 트래픽 증가와 같이 큰 부하에 대해 안전한지 확인한다. <br/> - 민감도 테스트: 올바르지 않은 데이터 터압의 데이터를 넣어 제대로 동작하는지 확인한다. <br/> - 성능 테스트: 응답 시간, 응답 처리량등 시스템 자원이 효율적으로 사용되고 있는지 확인한다. |

<br>

### **정적 테스트 동적 테스트**

프로그램의 실행 여부에 따라 정적 또는 동적 테스트로 나눌 수 있다. <br>

1. 정적 테스트 <br>
   코드를 수행하지 않고 검증하는 테스트다. <br>
   **_정적 분석기_**(Static Analyzer)를 이용해 코드에 내재된 이슈를 미리 파악해 볼 수 있고, 동료의 **_코드 리뷰_** 도한 정적 테스트에 해당한다.

<br>

2. 동적 테스트 <br>
   프로그램을 직접 실행해 진행하는 테스트다.

<br>

조직 규모에 따라, 개발 프로세스에 테스트 과정이 모두 포함되지 않는 경우도 있고 QA가 존재하지 않아 개발자가 모든 테스트를 직접 수행하기도 한다. <br>
Debugging은 개발 과정에서 당연히 수행하는 과정이지만 단위(Unit) 테스트는 같이 작성하는 게 좋다. <br>

**_V-Model_** 의 테스트 단계에서 뒤쪽 단계의 테스트로 갈수록 테스트 과정에서 발견되는 이슈를 수정하기 위해 드는 비용이 크게 증가한다. <br>
초기 테스트 코드 작성이 개발 속도를 딜레이 시킨다고 느낄 수 있지만 오히려 그 반대다. <br>
안정된 테스트 코드가 존재한다면 리팩토링을 보다 손쉽게 수행할 수 있다. 기존 코드 수정 시 수정된 코드가 시스템 동작의 영향이 가는지 가지 않는지 알 수 있다. <br>
테스트 코드 작성은 궁극적으로 소프트웨어의 품질 개선에 도움이 된다.

<br>

### **TDD**(Test Driven Development)

모자 바꿔 쓰기라고도 불리며, 테스트 코드를 먼저 작성 후 이를 기반으로 실제 소프트웨어의 기능을 개발해나가는 방법론이다. <br>
테스트 엔지니어와 개발 엔지니어의 역할을 바꿔가며 테스트 케이스를 풍부하게 작성할 수 있다. <br>

테스트 코드는 **_단위(Unit)_** 테스트만을 의미하진 않는다. <br>
사용자의 행동을 코드로 작성하여 어떤 동작이 일어나는지부터 모든 시슽메을 동적으로 수행 후 응답을 확인하는 E2E(End To End) 테스트도 포함된다. <br>

지속적 통합(CI, Continuous Intergation), 지속적 배포(CD, Continuous Deployment) 과정에 포함된 자동화 테스트는 배포 과정 중 발생하는 에러를 방지한다.

<br>

### **Jest**

테스트 Framework 구성 요소는 다음과 같다. <br>

1. 테스트가 실행되는 환경을 제공하는 테스트 러너(**`Test Runner`**) <br>
2. 테스트의 상황을 가정하는 어서션(**`Assertion`**) <br>
3. 테스트의 기대 결과를 비교하는 매처(**`Machers`**) <br>
4. 테스트 과정에서 현재 테스트 대상 Module이 의존하는 다른 Module을 임의로 대체하는 테스트 더블(**`Test Double`**)

<br>

Jest는 Meta가 주도해서 만든 테스트 Framework다.

<br>

#### **Unit Test**

Nest CLI를 통해 프로젝트 생성 시 Component와 같이 테스트 파일(.spec.ts)이 생성된다. <br>
이 규칙은 **_package.json_** 에 정의한다. <br>

```json
{
    "jest": {
        "moduleFileExtensions": ["js", "json", "ts"]
    },
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",                   // 테스트 코드 파일의 확장자 형식을 정규 표현식으로 선언
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
}
```

<br>

테스트 코드는 `describe()`와 **`it()`** 구문으로 구성된다. describe()는 테스트 스위트(Test suite)를 작성하는 **_Block_** 이다.

<br>

    테스트 스위트를 그룹화해 더 큰 단위의 테스트 스위트를 만들 수 있으며 특징은 다음과 같다.
    - 테스트 수행에 필요한 설정, 공통 모듈 생성 등과 같이 세부 테스트 케이스가 수행하기 위한 기반을 마련한다.

<br>

it() 구문은 특정 테스트 시나리오를 작성하는 부분이다. <br>
각 it() 구문은 별개의 테스트 케이스로 다뤄져야 하며 서로 의존관계가 존재하지 않도록 작성하는 게 중요하다. <br>
대표적인 테스트 케이스 작성법으로 `TDD`, `BDD`(Behavior Driven Development)가 있으며, 둘 다 필요한 작성 방식이다.

<br>

작성할 BDD 테스트 케이스 작성 스타일은 다음과 같다. <br>

    Given: 해당 테스트 케이스가 동작하기 위해 갖춰져야 하는 선행 조건(Pre Condition)이다. (어떠한 상황이 주어졌을 경우)
    When: 테스트하고자 하는 대상 코드를 실행한다. (대상 코드가 동작한다면을 의미)
    Then: 대상 코드의 수행 결과를 판단한다. (기대한 값과 실행 결과가 맞는지 비교)

<br>

describe()와 : 구문은 처음 인수로 문자열을 받는다. 이는 테스트 스위트와 케이스의 이름을 의미한다. <br>
다음 인수로는 수행될 코드가 포함된 콜백 함수다.

<br>

describe(), it() 구문 외에 `SetUp`, `TearDown` 이라 부르는 개념이 있다. <br>
테스트 스위트 내에서 모든 테스트 케이스를 수행하기 전 수행해야 하는 **_선행조건_** 이 있다면 SetUp 구문으로 반복 작업을 줄일 수 있다. <br>
마찬가지로 테스트 후 처리가 필요한다면 TearDown에서 공통 처리한다. <br>

```typescript
import {UserService} from "./users.service";

describe("UserService", () => {
    const userService: UserService = new UserService()
    
    describe("create", () => {
        it("Should create user", () => {
            // Given
            ...
            // Where
            ...
            // Then
        });
        
        it("Should throw error wher user already exists", () => {
            // Given
            ...
            // Where
            ...
            // Then
        });
    })
})
```

<br>

#### **Jest 구문**

1. **beforeAll()** <br>
   테스트 스위트 내의 모든 테스트 케이스 수행 전 한 번만 실행된다.

<br>

2. **beforeEach()** <br>
   각 테스트 케이스가 수행되기 전마다 수행된다.

<br>

3. **afterAll()** <br>
   모든 테스트 케이스가 수행된 후 한번 실행된다.

<br>

4. **afterEach()** <br>
   모든 테스트 케이스가 수행된 후 수행된다. <br>

<br>

테스트는 테스트를 하고자 하는 대상의 **_동작에만 집중_** 해야 한다. 대상 코드가 수행되면서 주입받거나 생성해서 사용한 외부 모듈이나 객체는 테스트의 대상이 아니다. <br>
외부 모듈은 외부 모듈만을 위한 테스트 코드를 작성해야 하며, 이를 위해서 외부 모듈의 동작을 우리가 원하는 대로 다룰 수 있어야 한다. <br>
그래야 외부 상태에 상관없이 대상 코드의 동작을 살필 수 있다. <br>

외부 모듈을 임의의 객체로 다루는 개념을 `Test Double` 이라고 하며, 테스트 더블은 세부적으로 `Dummy`, `Fake`, `Stub`, `Spy`, `Mock` 으로  구분할 수 있다.

<br>

1. **Dummy** <br>
   테스틀 위해 가짜로 생성된 데이터를 의미한다. 일반적으로 매개 변수 목록을 채우는 데만 사용한다. <br>

<br>

2. **Fake** <br>
   Database로 관리되는 다량의 데이터를 테스트한다고 가졍 할 경우 실제 Database를 사용할 경우 I/O에 엄청난 비용과 시간이 투자된다. <br>
   이럴 경우 In Memory Database와 같이 메모리에 데이터를 적재해 속도를 개선할 수 있다. <br>
   Production 환경에서 테스트 수행 도중 시스템이 비정상 죵료되는 경우 논리적 오류가 있는 데이터가 남게 되므로 세션 등과 같은 대상을 테스트할 경우 사용한다. <br>

<br>

3. **Spy** <br>
   테스트 수행 정보를 기록한다. 테스트 도중 함수 호출에 대해 해당 함수로 전달된 Parameter, Return Value,Exception 뿐만아니라 함수를 몇 번 호출했는지와 같은 정보들도 기록한다. <br>

<br>

4. **Stub** <br>
   함수 호출 결과를 미리 준비된 응답으로 제공한다. <br>

<br>

5. **Mock** <br>
   Stub과 동일한 역할을 하며, 테스트 중 만들어진 호출에 미리 준비된 답변을 제공하며 일반적으로 테스트를 위해 프로그래밍 된 거 외에는 응답하지 않는다.

<br>

    마틴 파울러에 따르면 테스트 대상이 의존하는 대상의 행위에 대해 검증이 필요하다면 모의 객체를 사용하고 상태를 검증하고자 한다면 Stub을 사용하라고 한다.
