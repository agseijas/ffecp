import { FileSystemCSVAirportsService } from './../src/main/ts/app/airports-service';
import { Airport } from '../src/main/ts/app/app';

describe("IATA airports to gps coordinates list", () => {
    
    test("Airports are asynchronously loaded from csv file", done => {

        const expectLoadsAirportCallback: (airportsMap: Map<String, Airport>) => void = airports => {
            done();
            const newLocal = airports.get("MAD");
            expect(newLocal).toEqual(new Airport({ altitude: 610, latitude: 40.472, longitude: -3.561 }));
        };
        const airports = new FileSystemCSVAirportsService('./src/main/resources/iata-airports.csv')

        airports.loadAsync(expectLoadsAirportCallback)
    });

    /*
    test("Generates airport-locations json from a database downloaded from http://www.partow.net/miscellaneous/airportdatabase/", done => {
        const parser = parse({ delimiter: ':'});
        let allAirports = "";
        const airportsStream = createReadStream('./resources/iata-airports.csv', {encoding: 'utf8'})
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
                done()
                //uncomment whenever you need to regenerate the list
                writeFileSync(resourcesDir + '/airports-locations.ts', allAirports, {encoding: 'utf8'})
                //do not forget to edit the file adding: export const airportscsv = `<having the content csv in between here>`
            })
    });
    */
})