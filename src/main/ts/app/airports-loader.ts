import { Airport } from './app';
import { createReadStream, writeFileSync } from 'fs-extra';
import parse from 'csv-parse';

const resourcesDir = __dirname + '/../../resources';

export class AirportsLoader {
    parser = parse({ delimiter: ";"});

    public load(seedAirports: (airportsMap: Map<String, Airport>) => void){

        const airports = new Map<String, Airport>()

        createReadStream(resourcesDir + '/airports-locations.csv', {encoding: 'utf8'})
            .pipe(this.parser)
            .on('data', record => {
                const { code, alt, lat, lon } = adapt(record);
                airports.set(code, new Airport({altitude: alt, latitude: lat, longitude: lon}))
            })
            .on('finish', () => {
                seedAirports(airports)
            })
    }
}

function adapt(record: any) {
    const code = record[0];
    const alt = Number.parseFloat(record[1]);
    const lat = Number.parseFloat(record[2]);
    const lon = Number.parseFloat(record[3]);
    return { code, alt, lat, lon };
}
