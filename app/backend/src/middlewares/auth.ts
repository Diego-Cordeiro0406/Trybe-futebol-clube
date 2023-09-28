import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class ValToken {
  static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const authHeader = req.headers.authorization;

    const message = 'Token must be a valid token';

    if (!authHeader) return res.status(401).json({ message: 'Token not found' });

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({ message });
    }
    const token = tokenParts[1];

    const validToken = await JWT.verify(token);

    req.body.user = validToken;

    if (validToken === message) return res.status(401).json({ message: validToken });

    next();
  }
}

// export default class ValToken {
//   static async validateToken(req: Request, res: Response, next: NextFunction):
//   Promise<Response | void> {
//     const tokenA = req.headers.authorization;
//     const tokenParts = tokenA.split(' ');
//     const token = tokenParts[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Token not found' });
//     }

//     const validToken = await JWT.verify(token);
//     req.body.user = validToken;
//     // console.log(token2);
//     if (validToken === 'Token must be a valid token') {
//       return res.status(401).json({ message: validToken });
//     }
//     next();
//   }
// }
