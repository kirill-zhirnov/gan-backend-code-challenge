import {Request, Response} from 'express';
import {findCitiesWithinRadiusBgRunner, findCityById} from '../libs/city';

export default function areaAction(req: Request, res: Response) {
	const from = ('from' in req.query) ? findCityById(String(req.query.from)) : null;
	const distance = ('distance' in req.query) ? parseInt(String(req.query.distance)) : null;

	if (!from || !distance) {
		return res.status(400).send('Incorrect params');
	}

	const hostPrefix  = process.env.HOST_PREFIX || 'http://127.0.0.1';
	const port = process.env.PORT || 8080;
	const resultId = '2152f96f-50c7-4d76-9e18-f7033bd14428';

	findCitiesWithinRadiusBgRunner(resultId, from, distance);

	res
		.status(202)
		.json({
			resultsUrl: `${hostPrefix}:${port}/area-result/${resultId}`
		})
	;
}