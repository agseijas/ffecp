import { FileSystemCSVAirportsService } from './../src/main/ts/app/airports-service';
import { Flight } from '../src/main/ts/app/flights';
import { AirportLoadCallback } from '../src/main/ts/app/airports-service';

describe("calc milleage for GPS coordinates", () => {
    const airports = new FileSystemCSVAirportsService('./src/main/resources/iata-airports.csv')

    test("Same location", done => {

        const airportsAndCheck : AirportLoadCallback = airports => {
            done();
            const anAirport = airports.get("MAD");
            if(anAirport) {
                const aFlightInSameLocation = new Flight(anAirport, anAirport);
                expect(aFlightInSameLocation.co2()).toBe(0);
            }
            else {
                fail("expected an airport")
            }
        };

        airports.loadAsync(airportsAndCheck)
    });

    test("Madrid Paris distance", done => {

        const airportsAndCheck : AirportLoadCallback = airports => {
            done();
            const anAirport = airports.get("MAD");
            const anotherAirport = airports.get("CDG");
            if(anAirport && anotherAirport) {
                const aFlight = new Flight(anAirport, anotherAirport);
                expect(aFlight.co2()).toBeCloseTo(130929.41516040108);
            }
            else {
                fail("expected an airport")
            }
        };

        airports.loadAsync(airportsAndCheck)
    });
})