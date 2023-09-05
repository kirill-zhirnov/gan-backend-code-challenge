import addresses from '../../addresses.json' ;
import {ICity} from '../@types/city';
import {calculationsRegistry} from '../components/calculationsRegistry';

export function findCityById(id: string): ICity|undefined {
	return (addresses as ICity[]).find(({guid}) => guid == id);
}

export function calculateDistanceBetweenCities(city1: ICity, city2: ICity): number {
	const earthRadius = 6371;

	const lat1Rad = (city1.latitude * Math.PI) / 180;
	const lon1Rad = (city1.longitude * Math.PI) / 180;
	const lat2Rad = (city2.latitude * Math.PI) / 180;
	const lon2Rad = (city2.longitude * Math.PI) / 180;

	const dLat = lat2Rad - lat1Rad;
	const dLon = lon2Rad - lon1Rad;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return earthRadius * c;
}

export function findCitiesWithinRadius(targetCity: ICity, radius: number): ICity[] {
	const result: ICity[] = [];

	for (const row of addresses as ICity[]) {
		if (row.guid == targetCity.guid) {
			continue;
		}

		const distance = calculateDistanceBetweenCities(targetCity, row);
		if (distance <= radius) {
			result.push(row);
		}
	}

	return result;
}

export function findCitiesWithinRadiusBgRunner(resultId: string, targetCity: ICity, radius: number) {
	calculationsRegistry.set(resultId, null);

	setImmediate(() => {
	// setTimeout(() => {
		calculationsRegistry.set(resultId, findCitiesWithinRadius(targetCity, radius));
	});
	// }, 20000);
}