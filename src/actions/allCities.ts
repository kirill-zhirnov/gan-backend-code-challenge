import {Request, Response} from 'express';
import addresses from '../../addresses.json' ;
import {ICity} from "../@types/city";

export default function allCitiesAction(req: Request, res: Response) {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Content-Disposition', 'attachment; filename=cities.json');

	const cities = addresses as ICity[];
	res.write('[');
	cities.forEach((city, index) => {
		res.write(JSON.stringify(city));
		if (index < cities.length - 1) {
			res.write(',');
		}
	});
	res.write(']');

	res.end();
}