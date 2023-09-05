import {Request, Response} from 'express';
import {calculateDistanceBetweenCities, findCityById} from '../libs/city';

export default function calculateDistanceAction(req: Request, res: Response) {
	const from = ('from' in req.query) ? findCityById(String(req.query.from)) : null;
	const to = ('to' in req.query) ? findCityById(String(req.query.to)) : null;

	if (!from || !to) {
		return res.status(400).send('Incorrect params');
	}

	const distance = calculateDistanceBetweenCities(from, to);

	res.json({
		from,
		to,
		unit: 'km',
		distance: Number(distance.toFixed(2))
	});
}