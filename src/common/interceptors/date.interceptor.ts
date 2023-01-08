import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
// import { map, tap } from 'rxjs/operators';

@Injectable()
export class BaseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();

		console.log('Request 전인가요!');

		return next
			.handle()
			.pipe(map((data) => console.log('Response의 데이터입니다!', data)));
	}
}
