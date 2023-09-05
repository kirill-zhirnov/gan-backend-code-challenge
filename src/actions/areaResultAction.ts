import {Request, Response} from 'express';
import {calculationsRegistry} from '../components/calculationsRegistry';

export default function areaResultAction(req: Request, res: Response) {
	if (!calculationsRegistry.has(req.params.resultId)) {
		return res.status(404).send('Result not found');
	}

	const cities = calculationsRegistry.get(req.params.resultId);
	if (cities) {
		return res.json({
			cities: calculationsRegistry.get(req.params.resultId)
		});
	}

	return res.status(202).send();
}