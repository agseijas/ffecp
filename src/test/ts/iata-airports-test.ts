import { createReadStream, writeFileSync } from 'fs-extra';
import parse from 'csv-parse';
import { Airport } from '../../main/ts/app/app';

const resourcesDir = __dirname + '/../resources';

describe("IATA airports to gps coordinates list", () => {
    const MAD_AIRPORT_GPS_LOCATION = {latitude: 40.492222222, longitude: -3.5716666667, altitude: 1}
    const parser = parse({ delimiter: ':'});

    test("Gets Airport for IATA code", done => {

        let allAirports = "";
        const airportsStream = createReadStream(resourcesDir + '/iata-airports.csv', {encoding: 'utf8'})
            .pipe(parser)
            .on('data', record => {
                const code = record[1] as String
                const alt = record[13] as number
                const lat = record[14] as number
                const lon = record[15] as number
                if(code !== 'N/A' && !(lat == 0 && lon == 0)){
                    const iataGPSLocations = code + ';' + alt + ';' + lat + ';' + lon
                    allAirports += iataGPSLocations + '\n'
                }
            })
            .on('finish', () => {
                done()
                //console.log(allAirports)
                //uncomment whenever you need to regenerate the list
                //writeFileSync(resourcesDir + '/airports-locations.csv', allAirports, {encoding: 'utf8'})
            })

        //expect(1).toBe(0);
    });
})