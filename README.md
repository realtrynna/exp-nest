<img src="https://user-images.githubusercontent.com/119386740/210351976-44486a71-6753-46cf-8cf5-0b1dd1ddd21e.jpg" width="300">

<br>

# NestJS로 배우는 백엔드 프로그래밍

|Date|Content|Description|
|------|---|------|
|23.01.03|Chapter1, 2| Node와 Nest 특징, Decorator|
|23.01.04|Chapter2 |Controller에서의 Routing, Wildcard, Body, Exception, Header, StatusCode 설정|
|23.01.05|Chapter3 |Dto, Service Layer의 특징, AOP, 횡단 관심사 | 

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
@Get(":userId/:postId")
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














