import { Request } from 'express';
import jwt from 'express-jwt';

export const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret';

function getTokenFromHeader(req: Request) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
		req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	}

	return null;
}

const auth = {
	required: jwt({
		credentialsRequired: true,
		secret: jwtSecret,
		getToken: getTokenFromHeader,
		userProperty: 'station'
	}),
	optional: jwt({
		credentialsRequired: false,
		secret: jwtSecret,
		getToken: getTokenFromHeader,
		userProperty: 'station'
	})
};

export const authentication = auth;