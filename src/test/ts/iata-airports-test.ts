import { AirportsLoader } from './../../main/ts/app/airports-loader';
import { Airport } from './../../main/ts/app/app';

describe("IATA airports to gps coordinates list", () => {
    
    test("Airports loader loads from csv file", done => {
        const airportsLoader = new AirportsLoader()

        const expectLoadsAirportCallback: (airportsMap: Map<String, Airport>) => void = airports => {
            done();
            const newLocal = airports.get("MAD");
            expect(newLocal).toEqual(new Airport({ altitude: 610, latitude: 40.472, longitude: -3.561 }));
        };

        airportsLoader.load(expectLoadsAirportCallback)
    });

    /*
    test("Generates airport-locations json from a database downloaded from http://www.partow.net/miscellaneous/airportdatabase/", done => {
        const parser = parse({ delimiter: ':'});
        let allAirports = "";
        const airportsStream = createReadStream(resourcesDir + '/iata-airports.csv', {encoding: 'utf8'})
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
                writeFileSync(resourcesDir + '/airports-locations.csv', allAirports, {encoding: 'utf8'})
            })
    });
    */
})