import { Airport } from './app';
import parse from 'csv-parse';
import { airportscsv } from './airports-locations'

export type AirportLoadCallback = (airportsMap: Map<String, Airport>) => void

export class AirportsLoader {

    public load(seedAirports: AirportLoadCallback){
        const parser = parse(airportscsv, { delimiter: ";", trim: true, skip_empty_lines: true});
        const airports = new Map<String, Airport>()

        parser
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
