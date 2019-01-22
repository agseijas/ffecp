import { AirportsEndpointService } from '../src/main/ts/app/airports-endpoint';
import { Airport } from "../src/main/ts/app/app";

describe("create airports from endpoint", () => {
    beforeEach(() => {
        global.fetch.resetMocks()
      });
    test("Airports are asynchronously loaded from endpoint", done => {
        global.fetch.mockResponse(JSON.stringify([{"code":"MAD","altitude":610,"latitude":40.472,"longitude":-3.561}]))

        const airports = new AirportsEndpointService();

        airports.loadAirportsAsync(airports => {
            done();
            const newLocal = airports.get("MAD");
            expect(newLocal).toEqual(new Airport({ altitude: 610, latitude: 40.472, longitude: -3.561 }));
        });
    });

})