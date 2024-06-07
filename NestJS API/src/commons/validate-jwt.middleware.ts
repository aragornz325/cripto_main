import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ValidateJwtMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const access_token = req.session.access_token;
    if (!access_token) {
      return res.status(401).json({ error: 'User not logged in' });
    }
    next();
  }
}
