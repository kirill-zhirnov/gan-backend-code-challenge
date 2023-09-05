import express from 'express';
import authMiddleware from './middlewares/authMiddleware';
import citiesByTagAction from './actions/citiesByTagAction';
import calculateDistanceAction from './actions/calculateDistanceAction';
import areaAction from './actions/areaAction';
import areaResultAction from './actions/areaResultAction';
import allCitiesAction from './actions/allCities';

const app = express();

app.use(authMiddleware(process.env.SECRETTOKEN || 'thesecrettoken'));

app.get('/cities-by-tag', citiesByTagAction);
app.get('/distance', calculateDistanceAction);
app.get('/area', areaAction);
app.get('/area-result/:resultId', areaResultAction);
app.get('/all-cities', allCitiesAction);


app.listen(process.env.PORT || 8080, () => console.log('Server started'))
