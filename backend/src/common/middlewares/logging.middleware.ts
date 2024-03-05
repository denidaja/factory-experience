import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use = (req: Request, res: Response, next: NextFunction): void => {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const loggingContext = process.env['LOGGING_CONTEXT'] || '';

    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.log(
        `${loggingContext} - ${method} ${originalUrl} ${statusCode} - ${userAgent}`,
      );
    });

    next();
  };
}
