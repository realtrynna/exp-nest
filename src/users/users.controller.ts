import { Controller, Get, HttpCode, Patch, Param, Header } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

@Controller('users')
export class UsersController {
	@HttpCode(200)
	@Get('/list')
	getUserList(): string {
		return '유저 목록';
	}

    @Header("Csddd", "value")
	@HttpCode(202)
	@Patch(':userId/:postId')
	updateUser(@Param("userId") userId: number, @Param("postId") postId: number) {
        console.log(userId, postId);
	}
}
