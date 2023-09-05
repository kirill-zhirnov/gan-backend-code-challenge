import {Request, Response} from 'express';
import addresses from '../../addresses.json' ;
import {ICity} from '../@types/city';

export default function citiesByTagAction(req: Request, res: Response) {
	let cities = Array.from(addresses as ICity[]);
	if ('isActive' in req.query) {
		const isActive = Boolean(req.query.isActive);
		cities = cities.filter((city) => city.isActive === isActive);
	}

	if ('tag' in req.query) {
		const tag = String(req.query.tag);
		cities = cities.filter((city) => city.tags.includes(tag));
	}

	res.json({cities});
}