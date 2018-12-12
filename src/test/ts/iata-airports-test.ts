import fs from 'fs';
import parse from 'csv-parse';
import { Airport } from '../../main/ts/app/app';

describe("IATA airports to gps coordinates list", () => {
    let MAD_AIRPORT_GPS_LOCATION = {latitude: 40.492222222, longitude: -3.5716666667, altitude: 1}

    test("Gets Airport for IATA code", () => {

        var parser = parse({delimiter: ';'}, function(data, err) {
            console.log(data);
        })

        fs.createReadStream(__dirname+'/../resources/iata-airports.csv').pipe(parser);
    
        //expect(parser).toBe(0);
    });
})