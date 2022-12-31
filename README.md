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

3. Middleware <br>
Router Handler가 Request 처리 전 부가 기능을 수행하기 위한 Component를 의미 Express => Middleware랑 동일함 <br>

* Middleware 정의
1. 어떤 형태의 Code라도 수행할 수 있음 <br>

2. Request와 Response에 변형을 가할 수 있음 <br>

3. Request와 Response에 주기를 끝낼 수 있음 <br>
- Response를 보내거나 Error 처리를 의미함

4. 여러 개의 Middleware를 사용한다면 끝에 next()를 호출하여 Call Stack상 다음 Middleware에게 제어권을 전달함 <br>
- next()를 호출하지 않으면 다음 Middleware로 넘어갈 수 없음

* Middleware 기능
1. Cookie Parsing
- Request의 Cookie를 Parsing하여 사용하기 쉬운 데이터 구조로 변경함

2. Session 관리
- Request의 Session Cookie를 찾고 해당 Cookie에 대한 상태를 조회해 요청에 Session 정보를 추가함
- 이를 통해 다음 Handler가 Session Object를 이용할 수 있음

3. 인증과 인가
- 사용자가 리소스에 대한 접근 권한이 있는지 검증
- Express에서 req.isAuthenticated()
- Nest에서는 Guard를 권장

4. 본문 Parsing
- JSON뿐만 아니라 File Stream과 같은 유형도 해석(Multer)

> Database Transaction이 필요한 Request가 있을 경우 CustomMiddleware로 만들 수 있음 <br>
> Interceptor와 유사함 <br>

* Logger Middleware
NestMiddleware를 Implements하여 구현함. <br>

* Middleware
```typescript
// logger.middleware.ts
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Express Middleware와 동일함
        console.log("Middleware 동작");
        next();
    },
}
```

* Middleware를 Module에 포함시키기 위해서 NestModule Interface를 구현
* AppModule Class에 NestModule을 Implements하여 Configure Method를 구현
```typescript
import { NestModule } from "@nest/common";

// /users Request 시 "Middleware 동작"
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes("/users")
    }
}
```

* MiddlewareConsumer
Configure Method에 인수로 전달된 consumer에 타입인 MiddlewareConsumer

* Middleware 2개 적용 시 apply 메서드에 인수로 나열하며 나열된 순서대로 실행됨
```typescript
consumer
    .apply(LoggerMiddle, Logger2Middleware) 
```

* forRoutes
문자열 형식의 경로를 주거나, Controller Class의 이름을 주거나, RouteInfo 객체를 넘길 수 있음 <br>
보통은 Controller Class를 줌

```typescript
consumer
    .apply(LoggerMiddleware)
    .forRoutes(UsersController)
```

* exclude
- /users 경로의 Request일 경우 LoggerMiddleware가 무시됨
```typescript
consumer
    .apply(LoggerMiddleware)
    .exclude({ path: "/users", method: RequestMethod.GET })
    .forRoutes(UsersController)
```

* Global Middleware
- AppModule Class에 Configure 메서드보다 먼저 실행됨
- Express에 app.use()랑 동일함
- Function Middleware는 DI를 사용할 수 없음
```typescript
// function Middleware
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Global Middleware");
}

// main.ts
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    
    app.use(logger)
}
```

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

### TypeORM Query Pattern
TypeOrm 사용 시 사람마다, 회사마다, Query 작성 방법이 다름 <br>
조직 내부에 Convention에 맞추면 됨 <br> 

1. Active Record Pattern <br>
Class Model 내부에 Static Method를 정의함 <br>
BaseEntity를 상속받아 Custom Method 작성 <br>
Model 안에서 Database에 접근함을 의미 <br>
규모가 작은 프로젝트에 적합하며 Query 연산이 복잡해질 경우 유지 보수와 테스트가 어려워짐 <br>

> Active Record
```typescript
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    static findUserByEmail(email: string) {
        return this.createQueryBuilder("user")
            .where("user.email", { email })
            .getMany();
    }
}
```

```typescript
const user = new User(); // Model 생성자

user.email = email;
user.password = password;

await user.save();

// 또는

const user = await this.userRepository.save({
    email,
    password,
});

const user = await user.find({});
const findUser = await User.findOne({ email }) // BaseEntity Method
const findUserByEmail = await User.findUserByEmail(email); // Custom Method
```

<br>

2. Data Mapper <br>
Model의 Repository를 Service에 DI하여 사용 <br>
Model과 Database의 의존성을 낮춤 <br>

```typescript
// user.module.ts
// user.module에 TypeOrmModule.forFeature([User])를 넣어주면 @InjectRepository 사용 가능
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "nestjs/typeorm";
import { UserService } from "";
import { UserController } from "";
import { User } from "";

@Module({
    imports: [TypeOrmModule.forFeature([ User ])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}

// user.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findUserList(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserByI(): promise<User> {
        return this.userRepository.findOne({
            where: { id },
        });
    }
}
```
<br>

### TypeOrm Transaction
Query 작성과 마찬가지로 Transaction 방법도 다양함. <br>

```typescript
import { getConnection } from "typeorm";

await getConnection().transaction(async transactionEntityManger => {
    // Query Logic
});

// 또는

import { getManger } from "typeorm";

await getManger().transaction(async transactionEntityManger => {
    await transactionEntityManger.save(user);
});
```
<br>

@Transaction Decorator 사용 시 typeorm-transactional-hooked 라이브러리 설치 <Br>
```typescript
@Transaction()
save(@TransactionManger() manger: EntityManger, user: User) {
    return manger.save(user);
}

// 또는

@Transaction()
save(user: User, @TransactionRepository(User) userRepository: Repository<User>) {
    return userRepository.save(user);
}
```

<br>

Query Runner <br>
```typescript
import { getConnection } from "typeorm";

const connection = getConnection();
const queryRunner = connection.createQueryRunner(); // queryRunner 생성

await queryRunner.connect(); // 생성된 queryRunner를 통해 Database 연결

await queryRunner.query("SELECT * FROM user");

await user = await queryRunner.manger.find(User);

// transaction
await queryRunner.startTransaction();

try {
    await queryRunner.manger.save(user);
    await queryRunner.manger.save(post);

    await queryRunner.commitTransaction(); // commit
} catch (err) {
    await queryRunner.rollbackTransaction(); // rollback
} finally {
    await queryRunner.release(); // 반납
}
```

<br>

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
5. 간편한 설정


<br>

Express, Fastify Framework를 래핑하여 동작함.
Express는 과도한 유연함으로 소프트웨어의 품질이 일정하지 않고 프로젝트에 적합한 라이브러리를 찾기 위해 많은 시간이 소요됨.
이에 반해 Nest는 대부분의 기능(Database, ORM, Configuration)이 차제적으로 내장되어있고 필요 시 라이브러리를 설치하여 확장할 수 있음

### Guards
1. 인증 (Authentication) <br>
요청자가 해당 서비스에 올바른 유저인지 검증하는 과정 <br>
요청자가 누구인지 증명하는 과정을 의미함. <br>
매 요청 시 Header에 Token을 포함시켜 요청<br>
서버는 Token Decoded 과정을 통해 검증 <br>

2. 인가(Authorization) <br>
인증을 통과한 유저가 요청한 리소스에 접근할 권한이 있는지를 검증하는 과정 <br>

> Permission, Role, ACL 같은 개념 <br>
> Nest에서 인가는 Guards로 구현함 <br>
> 인증 실패 시 401 Unauthorized <br>
> 인가 실패 시 403 Forbidden <br>

* Middleware로 인가를 확인할 수 없는 이유
Middleware는 실행 콘텍스트(ExecutionContext)에 접근할 수 없음 자신의 작업만 수행하고 next()를 호출 <br>
다음 어떤 Handler가 실행될 지 알 수 없음 반면 Guards는 실행 콘텍스트에 접근 가능 <br>

```typescript
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable }

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        // 
        return this.validateRequest(request);
    }

    private validateRequest(request: any) {
        return true;
    }
}
```

* 실행 콘텍스트
canActivate는 실행 콘텍스트를 인수로 받고 ExecutionContext는 ArgumentsHost를 상속받는다. <br>
context인수는 Request와 Response에 대한 정보가 들어있음. <br>

> HTTP의 req, res 정보는 switchToHttp() <br>

**__context__** 를 통해 얻은 정보를 validateRequest 함수에 넣어 Return 값으로 인가를 진행함 <br>

* AuthGuard 적용
ExceptionFilter 적용 방법과 동일 <br>
__**@UseGuard()**__ 키워드로 적용 <br>

<br>

```typescript
@UseGuards(AuthGuard)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    
    @UseGuards(AuthGuard)
    @Get()
    here(): string {
        return this.appService.here();
    }
}
```

* 전역 UseGuard
```typescript
async function bootstrap() {
    app.useGlobalGuards(new AuthGuard());
}
```

### Repository
```typescript
export class authService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { 
                email
            },
        });
    }
}
```

> Service에서 Service 메서드를 호출하는 건 지양 <br>
> 테스트 코드 작성 시 Mocking이 매우 불편 Mocking => Mocking => Mocking <br>
> Controller => Service => Repository => Entity <br>

### Passport
npm i passport @nestjs/passport <br>
Express에 Passport Strategy 방식이랑 동일함 <br>

> Nest Community에서 Passport를 혐오함 왜 그런지 나중에 알아보자 <br>

1. @UseGuards(LocalAuthGuard) Decorator를 사용
- LocalAuthGuard를 직접 구현 (AuthGuard를 상속 받음)
- Passport에 AuthGuard를 확장

* auth => local.auth.guard.ts
```typescript
// Express => passport.authenticate("local")이랑 동일
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@injectable()
export class LocalAuthGuard extends AuthGuard("local") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const can = await super.canActivate(context);

        if (can) {
            const request = context.switchToHttp().getRequest();

            console.log(request)

            await super.logIn(request);
        }

        return true;
    }
}   
```

* auth => local.strategy.ts
```typescript
// Express => LocalStrategy랑 동일
import { Strategy } from "passport-local"
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "";

@Injectable()
export class LocalStrategy extendsPassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameFiled: "email", passwordFiled: "password" });
    }

    async validate(email: string, password: string, done: CallableFunction) {
        const user = await this.authService.validateUser(email, password);

        if (!user) throw new UnauthorizedException(); // 401

        return done(null, user); // => serializer
    }
}
```

* auth => local.serializer.ts
```typescript
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Users } from "";
import { AuthService } from "";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor (
        private readonly authService: AuthService,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {
        super();
    }

    serializeUser(user: Users, done: CallableFunction) {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction) {
        try {
            const user = await this.userRepository.findOneOrFail({
                where: { id: +userId },
                select: ["id", "email", "nickname"],
                relations: ["userMeta"],
            });
            
            return done(null, user); // req.user 사용 가능
        } catch (err) {
            console.log(err);
            done(err);
        }
        
        await this.userRepository
            .findOneOrFail({
                where: { id: +userId },
                select: ["id", "email", "nickname"],
                relations: ["userMeta"],
            });
    } 
}
```

* auth.module.ts <br>
- @Injectable() => Providers
- 라이브러리 => imports
```typescript
@Module({
    imports: [
        PassportModule.register({ session: true }),
        TypeOrmModule.forFeature([Users]),
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
});

export class AuthModule {};
```

* main.ts
- Express => app.use() 처리
```typescript
app.use(passport.initialize());
app.use(passport.session());
```

## isAuthenticated
Guard로 구현 

* auth => logged.in.ts
```typescript
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}
```

<br>

### 회원 가입 로직
1. 사용자로부터 회원 가입 정보를 받아 db에 저장 <br>
1-1. 가입 준비 단계

2. 입력받은 이메일로 회원가입 확인 이메일 발송 <br>

3. 사용자는 이메일을 확인하고 회원 가입 인증 요청 <br>
3-1. 이메일에는 가입 검증 링크가 포함되어있음
3-2. 링크를 통해 요청을 보내면 가입 준비 단계에서 승인 완료 단계로 넘어감
3-3. 승인 완료와 동시에 Access Token을 발급하여 로그인 상태로 바꿈 (가입 검증 완료 후 다시 로그인 과정을 거칠 필요 없도록)

* 이 후 사용자 이메일과 패스워드로 검증 진행

<br>

* env
* Request Validate
* Authenticate
* Logging
* Health Check
* CQRS
* Clean Architecture
* Unit Test