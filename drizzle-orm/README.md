https://orm.drizzle.team/

```cmd
npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg
```

## drizzle-kit
- generate
```cmd
drizzle-kit generate:pg
```
- pull
```cmd
drizzle-kit introspect:pg
```
- push
```cmd
drizzle-kit push:pg
```
- 기존 마이그레이션 파일 삭제
```cmd
drizzle-kit drop
```
- Db와 ORM 동기화 여부 체크
```cmd
drizzle-kit check:pg
```
