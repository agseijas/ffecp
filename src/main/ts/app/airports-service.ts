import { Airport } from './app';
import parse from 'csv-parse';
import { createReadStream, existsSync } from 'fs';

export type AirportLoadCallback = (airportsMap: Map<String, Airport>) => void

interface AirportService {
    loadAsync(seedAirports: AirportLoadCallback): void
}

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
                const code = record[1] as String
                const alt = record[13] as number
                const lat = record[14] as number
                const lon = record[15] as number
                if(code !== 'N/A' && !(lat == 0 && lon == 0)){
                    const adaptedGPSLocation = adapt([code,alt,lat,lon]);
                    //allAirports += iataGPSLocations + '\n'
                    airports.set(code, new Airport(adaptedGPSLocation))
                }
            })
            .on('finish', () => {
                seedAirports(airports)
            })
    }
}

function adapt(record: any) {
    const alt = Number.parseFloat(record[1]);
    const lat = Number.parseFloat(record[2]);
    const lon = Number.parseFloat(record[3]);
    return {altitude: alt, latitude: lat, longitude: lon};
}
