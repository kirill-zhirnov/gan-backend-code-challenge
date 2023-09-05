import {Request, Response, NextFunction} from 'express';

export default function authMiddleware(secretToken: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers['authorization'];

		if (!authHeader) {
			return res.status(401).send('Unauthorized');
		}

		const token = authHeader.split(' ')[1];
		const decodedToken = Buffer.from(token, 'base64').toString('utf-8');

		if (decodedToken === secretToken) {
			next();
		} else {
			res.status(401).send('Unauthorized');
		}
	};
}