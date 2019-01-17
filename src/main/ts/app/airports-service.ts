import { Airport } from './app';
import parse from 'csv-parse';
import { createReadStream } from 'fs';

export type AirportLoadCallback = (airportsMap: Map<String, Airport>) => void

interface AirportService {
    loadAsync(seedAirports: AirportLoadCallback): void
}

type IATAAirport = {code: string, alt: string, lat: string, lon: string}

export class FileSystemCSVAirportsService implements AirportService{ 
    private filePath: string;

    constructor (csvPath: string) {
        this.filePath = csvPath
    }

    public loadAsync(seedAirports: AirportLoadCallback){
        const parser = parse({ delimiter: ':'});
        const airports = new Map<String, Airport>()
        createReadStream(this.filePath, {encoding: 'utf8'})
            .pipe(parser)
            .on('data', record => {
                const airport = {code: record[1], alt: record[13], lat: record[14], lon: record[15]};
                store(airport, airports);
            })
            .on('finish', () => {
                seedAirports(airports)
            })
    }
}

function store(airport: IATAAirport, airports: Map<String, Airport>) {
    const iataAirport = adapt(airport);
    if (airport.code !== 'N/A' && !(iataAirport.latitude == 0 && iataAirport.longitude == 0)) {
        airports.set(airport.code, new Airport(iataAirport));
    }
}

function adapt(airport: IATAAirport) {
    const alt = Number.parseFloat(airport.alt);
    const lat = Number.parseFloat(airport.lat);
    const lon = Number.parseFloat(airport.lon);
    return {altitude: alt, latitude: lat, longitude: lon};
}
