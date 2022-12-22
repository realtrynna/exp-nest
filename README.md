# Slack Clone
https://docs.nestjs.com/

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

