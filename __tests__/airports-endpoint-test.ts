import { AirportsEndpointService } from '../src/main/ts/app/airports-endpoint';
import { Airport } from "../src/main/ts/app/app";

describe("create airports from endpoint", () => {

    test("Airports are asynchronously loaded from endpoint", done => {
        const airports = new AirportsEndpointService();

        airports.loadAirportsAsync(airports => {
            done();
            const newLocal = airports.get("MAD");
            expect(newLocal).toEqual(new Airport({ altitude: 610, latitude: 40.472, longitude: -3.561 }));
        });
    });

})