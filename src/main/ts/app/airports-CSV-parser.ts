import { AirportService, AirportLoadCallback, Airport, IATAAirport } from "..";
import parse from 'csv-parse';
import { createReadStream } from "fs";

export class FileSystemCSVAirportsService implements AirportService { 
    private filePath: string;

    constructor (csvPath: string) {
        this.filePath = csvPath
    }

    public loadAirportsAsync(loadedAirports: AirportLoadCallback){
        const airports = new Map<String, Airport>()
        createReadStream(this.filePath, {encoding: 'utf8'})
            .pipe(this.toParser())
            .on('data', record => {
                store(this.createAirport(record), 
                    airports);
            })
            .on('finish', () => {
                loadedAirports(airports)
            })
    }

    private createAirport(record: any): IATAAirport {
        return { code: record[1], alt: record[13], lat: record[14], lon: record[15] };
    }

    private toParser() {
        return parse({ delimiter: ':' });
    }
}

function store(airport: IATAAirport, airports: Map<String, Airport>) {
    const iataAirport = adapt(airport);
    if (isValidAirportCode(airport.code) && 
        hasGPSCoordinates()) {
        airports.set(airport.code, new Airport(iataAirport));
    }

    function hasGPSCoordinates() {
        return (iataAirport.latitude != 0 || iataAirport.longitude != 0);
    }
}

function isValidAirportCode(code: string) {
    return code !== 'N/A';
}

function adapt(airport: IATAAirport) {
    const alt = Number.parseFloat(airport.alt);
    const lat = Number.parseFloat(airport.lat);
    const lon = Number.parseFloat(airport.lon);
    return {altitude: alt, latitude: lat, longitude: lon};
}
