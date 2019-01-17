import { Airport } from './app';
import parse from 'csv-parse';
import { createReadStream } from 'fs';

export type AirportLoadCallback = (airportsMap: Map<String, Airport>) => void

interface AirportService {
    loadAsync(seedAirports: AirportLoadCallback): void
}

export class EmbeddedCSVAirportsService implements AirportService{
    private filePath: string;

    constructor (csvPath: string) {
        this.filePath = csvPath
    }

    public loadAsync(seedAirports: AirportLoadCallback){
        const parser = parse({ delimiter: ':'});
        let allAirports = "";
        const airportsStream = createReadStream(this.filePath, {encoding: 'utf8'})
            .pipe(parser)
            .on('data', record => {
                const code = record[1] as String
                const alt = record[13] as number
                const lat = record[14] as number
                const lon = record[15] as number
                if(code !== 'N/A' && !(lat == 0 && lon == 0)){
                    const iataGPSLocations = [{ "MAD": [0,0,0]}]
                    //const iataGPSLocations = code + ';' + alt + ';' + lat + ';' + lon
                    allAirports += iataGPSLocations + '\n'
                }
            })
            .on('finish', () => {
                const reparser = parse(allAirports, { delimiter: ";", trim: true, skip_empty_lines: true });
                const airports = new Map<String, Airport>()
        
                reparser
                    .on('data', record => {
                        const { code, alt, lat, lon } = adapt(record);
                        airports.set(code, new Airport({altitude: alt, latitude: lat, longitude: lon}))
                    })
                    .on('finish', () => {
                        seedAirports(airports)
                    })
            });
    }
}

function adapt(record: any) {
    const code = record[0];
    const alt = Number.parseFloat(record[1]);
    const lat = Number.parseFloat(record[2]);
    const lon = Number.parseFloat(record[3]);
    return { code, alt, lat, lon };
}
