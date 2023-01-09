<img src="https://user-images.githubusercontent.com/119386740/210351976-44486a71-6753-46cf-8cf5-0b1dd1ddd21e.jpg" width="300">

<br>

# NestJS로 배우는 백엔드 프로그래밍

|Date|Content|Description|
|------|---|------|
|23.01.03|Chapter1, 2| Node와 Nest 특징, Decorator|
|23.01.04|Chapter2 |Controller에서의 Routing, Wildcard, Body, Exception, Header, StatusCode 설정|
|23.01.05|Chapter3 |Dto, Service Layer의 특징, AOP, 횡단 관심사 | 
|23.01.06|Chapter4 |Provider, DI, Scope |
|23.01.09|Chapter5 | Custom Provider, SW 복잡도를 낮추기 위한 Module 설계, Swagger |

<br>

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
    .addCookieAuth("connect.sid")    // SessionCookie?
    .build()
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
    name: "userId"
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

<br>

# 오타
53p, Cusom => Custom

<br>

## **_Chapter1_** Hello NestJS
**_NestJS_** 는 NodeJS 기반의 Web Framework 로 **_Express_** 또는 **_Fastify_** Framework를 Rapping 하여 동작한다. <br>
Express보다 Fastify가 성능적으로 **_2배 이상_** 빠르지만 범용적 측면과 Middleware 호환성을 고려해 기본적으로 **_Express_** 를 Rapping 한다. <br>

Express는 빠른 시간 안에 효율적인 서버 구축이 가능하고 뛰어난 확장성을 가지고 있지만 과도한 유연함으로 **_소프트웨어의 품질_** 이 일정하지 않다. <br>
높은 자유도는 양날의 칼이며 자유도가 높다 보니 프로젝트 규모가 커질 시 **_협업의 어려움_** 이 발생한다. <br>

NestJS는 Typescript를 기본으로 채택하고 Angular의 영향을 받아 만들어졌다. <br>
Module, Component 기반의 프로그래밍으로 코드의 **_재사용성_** 을 높인다. <br>
또한 Express 사용 시 접할 수 없었던 **_IoC_**(Inversion Of Control), **_DI_**(Dependency Injection), **_AOP_**(Aspect Oriented Programing)과 같은 객체 지향 프로그래밍으로 작성된다. <br>

<br>

**Web Framework가 제공해야할 필수 기능은 다음과 같다.** <br>

* 최신 ECMA 스크립트 지원
* Typescript 지원
* Command Query Responsibility Separation
* HTTP Header Security (Express === Helmet)
* 편리한 설정
* Interceptor
* Middleware
* Scheduling
* Logging
* Testing
* Swagger
* ORM

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

* 로컬 환경 (**_Local_**): 개발자의 로컬 서버
* 스테이지 환경 (***_Stage_***): 배포 전 기능 테스트를 위한 서버
* 프로덕션 환경 (**_Production_**): 실제 운영 서버

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
멀티 스레딩은 동시에 여러 작업을 처리할 수 있는 장점이 있지만 자원을 공유하기 위한 **_비용이 크고_** 동기화에 논리적 오류가 발생하면 **_Lock_** 이 걸릴 수 있다. <br>
스레드가 늘어날 경우 메모리를 사용하므로 메모리 관리도 중요하다.

<br>

NodeJS는 **_싱글 스레드_** 로 하나의 스레드가 모든 작업을 처리한다. <br>
**_Application Level_** 에서는 싱글 스레드지만 **_BackGround_** 에서는 **_스레드 풀_** 로 처리된다. <br>
스레드 풀은 **_libuv_** 라이브러리를 통해 동작하므로 개발자는 신경 쓸 필요 없다. <br>

<br>

NodeJS는 들어온 Request에 대한 완료 여부와 상관없이 다음 작업을 처리하는 **_비동기 방식_** 이다. <br>
Request는 단일 스레드로 받지만 순서대로 처리하지 않고 먼저 처리되는 순서대로 이벤트를 반환한다.

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
        "experimentalDecorators": true,
    }
}
```

<br>

#### **데코레이터**
```typescript
function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("Decorator");
}

class UserDto {
    @decorator
    test() {
      console.log(this);
    }
}

const user = new UserDto();
user.test()
// Decorator
// UserDto
```

<br>

#### **커스텀 데코레이터**
Decorator에 인수를 넘겨 동작을 변경하고 싶다면 **_Decorator를 Return_**
```typescript
function decorator(value: string) {
    console.log("Decorator");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(value);
    }
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
* Controller가 생성되면 AppModule에서 **_Import_** 하여 controllers에 삽입된다.
```cmd
nest g co Users
```

<br>

**Controller**
* @Controller Decorator를 사용해 Controller의 역할을 명시한다.
* @Get() Decorator의 인수로 **_Path_** 를 넣어준다.
* @Controller() Decorator의 인수로 Routing Path의 **_Prefix_** 를 넣어줄 수 있다.
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
* Express 와일드 카드와 개념 동일
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
* @Req Decorator로 다룰 수 있지만 @Req 객체를 직접 다루는 건 **_지양_** 해야 한다. (Testing을 위해??)
* **_@Query()_**, **_@Param_**(key?: string), **_@Body()_** Decorator를 이용해 조작한다.
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
* @HttpCode() Decorator를 통해 응답 **_상태 코드_** 지정 가능
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
* BadRequestException을 통해 예외 처리 가능
* BadRequestException뿐만 아니라 다양한 Exception 내장
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
* @Header("key", "value") Decorator를 기반으로 응답 헤더 설정 가능
* res.header()로도 설정 가능
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
* 계층 간 전송되는 데이터를 의미한다. (Data Transfer Object)
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

* GET Request의 페이징 처리
* GET /users?offset=0&limit=10
* @Query() Dto로 처리
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
|회원 가입|POST| /users| email, name, password, gender | ""  |
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

* **Controller** <br>
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

* **Service** <br> 
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

* user.module.ts
```typescript
import { UserService } from "";

@Module({
    providers: [UserService]
})
export class UserModule {}
```

<br>

1. 속성 기반 주입 <br>
보통 Constructor(생성자)를 통해 Provider를 주입한다. <br>
하지만 Provider를 직접 주입받아 사용하지 않고 상속 관계에 있는 **_자식 클래스_** 를 주입받아 사용할 수도 있다. <br>
자식 클래스에서 부모 클래스가 제공하는 Method를 호출하기 위해서는 부모 클래스에서 필요한 Provider를 **_super()_** 를 통해 전달해야 한다. <br>

<br>

* base.service.ts
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

* service.a.ts
```typescript
@Injectable()
export class ServiceA {
    method() {
        return "ServiceA Method입니다.";
    }
}
```

* service.b.ts
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

* Controller와 Provider에 Scope를 주어 **_생명주기_** 를 지정하는 방법이 있다. <br>
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
* @Injectable() Decorator에 Scope
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
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    controllers?: Type<any>[];
    providers?: Provider[];
    exports?: Array<DynamicModule | Promise<DynamicModule> | string | symbol | Provider | ForwardReference | Abstract<any> | Function>
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

















