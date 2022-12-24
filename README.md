# https://docs.nestjs.com/
1. Guard <br>
@Injectable()을 구현하는데 Decorator로 주석이 달린 클래스다. <br>
Guard는 *__단일 책임__* 의 원칙이 있으며 런타임에 존재하는 특정 조건(Authenticate, Role, ACL)에 따라 지정된 요청이 *__경로 처리기(Controller)__* 가 처리 할지 말지를 결정한다.
일반적으로 Express에서 *__권한 부여__* 는 Middleware에 의해 처리되었다.

<br>

하지만 Middleware는 *__next()__* 가 호출된 후 어떤 Handler가 호출되는지 알 수 없다.
반면 **__Guards__** 는 ExecutionContext가 존재하므로 다음에 호출될 *__Handler__* 에 대해 정확히 알 수 있다. 

* ACL
Access Control List로 액세스 제어 목록을 의미한다. <br>
액스세 권한이 부여된 *__사용자__* 또는 *__시스템 프로세스__* 들만 접근이 가능함

<br>

2. Provider <br>
Provider는 NestJS 기본 개념으로 Service, Repository, Factory, Helper 등은 Provider로 취급될 수 있다. Provider의 주요 개념은 종속성으로 주입할 수 있다. 개체는 서로 다양한 관계를 맺을 수 있으며 개체를 연결하는 기능은 Nest 런타임에 위임된다.

* 종속성이란
응용 프로그램과 데이터 간의 상호 의존 관계를 의미한다.

> 

<br>

2. Service <br>


<br>

### 패키지
* npm i @nestjs/cli: 전역 명령어
* npm i @nestjs/config: 환경 변수 모듈

### CLI
https://docs.nestjs.com/cli/usages

* nest g mo user: UserModule
* nest g co user: UserController
* nest g s user: UserService 

<br>

### 특징 (추후 정리 예정)
0. Nest는 Module 기반임 __모듈로 패키징__ 한 라이브러리를 사용 
<br>

1. Nest는 Express 기반 (Express 기능은 Nest에서 사용 가능) 
<br>

2. Module을 직접 구현한다는 점에서 Spring보다 __IOC(Inversion Of Control)__ 가 약함 
<br>

3. 익스프레스는 Router 위주의 설계인 반면 네스트는 __Module__ 위주의 설계 
<br>

4. 비즈니스 로직을 __서비스__ 로 분리하는 이유는 __재사용__ 과 __테스트__ 를 위함 
<br>

5. __implements__ 는 에디터와 타입스크립트의 활용을 극대화하기 위함 
<br>

6. Service를 모듈 providers에 등록하면 내부적으로 DI 해줌 
<br>

7. req.body: @Req, req.query: @Query, req.params: @Param
<br>

8. Nest의 Dto 타입 Convention은 클래스
> 인터페이스는 타입스크립트 문법이므로 컴파일 후 제거됨 <br>
> 클래스는 자바스크립트 문법이라 런타임 단계에서 존재 <br>
> 클래스가 인터페이스 대체 가능
<br>

9. Controller ㅡ> Service ㅡ> Repository(TypeORM === Entity)
<br>

10. 

<br>

## TypeORM
1. Workspace와 Channel 모델은 1:N 일대다 <br>
워크스페이스는 회사의 개념, 채널은 회사 내부 부서의 개념 <br>
워크스페이스 1개는 여러개의 채널을 가질 수 있음 <br>

> 워크스페이스 OneToMany <br>
> 채널 ManyToOne <br>

* @JoinColumn은 두 모델 중 하나의 모델에만 작성하면 됨 <br>
> 외래키가 있는 모델에 붙이는 게 컨벤션 (: <br>

<br>

2. Member와 Workspace 모델은 N:M 다대다 <br>
사용자는 여러 개의 워크스페이스에 속할 수 있음 <br>
워크스페이스 안에는 여러 명의 사용자가 있음 <br>

> 사용자 ManyToMany <br>
> 워크스페이스 ManyToMany <br>

* 다대다 관계는 중간 테이블(WorkspaceMember)이 생성됨 <br>
* 다대다 관계는 @JoinTable에 중간 테이블(WorkspaceMember) 작성 <br>

```typescript
// User
@OneToMany(() => Post, (post) => post.User)
Post: Post[];

// Post
@ManyToOne(() => User, (user) => user.Post, {
    onDelete: "SET NULL",
    onUpdate:  "CASCADE",
})
// 외래키
@JoinColumn([{ name: "UserId", referencedColumnName: "id" } ])
User: User;
```

#### Seeding
초기 더미 데이터 생성 <br>
npm i typeorm-extension (v0.3) <br>

> typeorm-seeding (v0.2 사용 불가) <br>
> typeorm-model-generate (v0.2 사용 불가) <br>

<br>

### Migration
기존 테이블 수정 기능 <br>

* 쿼리를 통해 바꾸면 Entity도 바꿔줘야 함 <br>
* 

### Request Life Cycle
1. Incoming Request <br>
> 요청 <br>

<br>

2. Globally Bound Middleware
3. Module Bound Middleware
> 미들웨어 <br>

<br>

4. Global Guards
5. Controller Guards
6. Route Guards
> 가드 <br>

<br>

7. Global Interceptors (Pre Controller)
8. Controller Interceptors (PreController)
9. Route Interceptors (Pre Controller)
> 컨트롤러 실행 전 Interceptor

<br>

10. Global Pipes
11. Controller Pipes
12. Route Pipes
13. Route Parameter pipes
> 데이터 파이프

<br>

14. Controller (Method Handler)
> 컨트롤러 로직 실행

<br>

15. Service (If Exists)
> 서비스 로직 실행

<br>

16. Route Interceptor (Post Request)
17. Controller Interceptor (Post Request)
18. Global Interceptor (Post Request)
> 컨트롤러 로직 응답 후 Interceptor??

<br>

19. Exception Filters (Router, Then Controller, Then Global)
> 에러 핸들링

<br>

20. Server Response
> 응답

<br>

## Interceptor
Interceptor는 Decorator가 달린 Class이며 NestInterceptor 인터페이스로 구현되있다.
구현 시 NestInterceptor를 Implements하여 구현한다.

* Controller 실핼 전, Response 후 실행될 수 있다.

Interceptor는 AOP(Aspect Oriented Programing)에서 영감을 받아 만들어졌고 다음 기능을 수행한다.

- 메서드(Controller Method) 실행 전/후 추가 로직 바인딩
- Interceptor에서 Return된 결과 변환
- Return된 예외(Exception Error?) 변환
- 기본 기능 동작 확장
- 특정 조건에 따라 함수 재정의(Cashing)

<br>

매개변수 context와 next

1. context: ExecutionContext 
ArgumentsHost를 상속 받는다. <br>

```typescript
import { ExecutionContext } from "@nestjs/common";
```

> getArgs(), switchToRpc(), switchToHttp(), switchToWs(), getType()...... <br>

<br>

2. next: CallHandler
Interceptor 특정 지점에서 메서드를 호출 <br>

```typescript
import { CallHandler } from "@nestjs/common";
```

<br>

```typescript
@Injectable()
export class ReqResInterceptor implements NestInterceptor {

}
```


### Nest 장점
Nest는 프론트 Framework Angular의 영향을 받았음. Module과 Component 기반 방식으로 코드의 재사용성을 높임.
또한 Express에서 경험해볼 수 없는 IOC(Inversion of Control), DI(Dependence Injection), AOP(Aspect Oriented Programing)와 같은 객체 지향 개념 도입 

<br>

* Web Framework가 제공해야할 필수 기능
1. 최신 ECMA 문법 지원
2. 타입스크립트 언어 지원
3. CQRS(Command Query Responsibility Separation)
4. HTTP Header Security(Express => helmet)


<br>

Express, Fastify Framework를 래핑하여 동작함.
Express는 과도한 유연함으로 소프트웨어의 품질이 일정하지 않고 프로젝트에 적합한 라이브러리를 찾기 위해 많은 시간이 소요됨.
이에 반해 Nest는 대부분의 기능(Database, ORM, Configuration)이 차제적으로 내장되어있고 피욜시 라이브러리를 설치하여 확장할 수 있음
