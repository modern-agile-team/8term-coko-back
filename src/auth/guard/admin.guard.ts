import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly configservice: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const accessToken = request?.cookies?.accessToken;
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload = jwt.verify(
        accessToken,
        this.configservice.get<string>('ACCESS_SECRET'),
      ) as any;

      const { userId } = payload;
      const user = await this.userService.getUser(userId);

      if (user.role === true) {
        return true;
      }

      throw new ForbiddenException('User does not have admin privileges');
    } catch (accessError) {
      throw new UnauthorizedException('Invalid access token or User not found');
    }
  }
}
