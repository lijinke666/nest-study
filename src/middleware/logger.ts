import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): MiddlewareFunction {
    return (req, res, next) => {
      console.log(req.query);
      console.log(`[${name}]: Request...`);
      next();
    };
  }
}

// 对 express 的 middleware 的封装

// module.exports = (req,res,next) => {
// }