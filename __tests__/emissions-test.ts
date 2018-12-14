import { Flight } from '../src/main/ts/app/flights';
import { AirportsLoader, AirportLoadCallback } from '../src/main/ts/app/airports-loader';

describe("calc milleage for GPS coordinates", () => {

    test("Same location", done => {
        const airportsLoader = new AirportsLoader()

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

        airportsLoader.load(airportsAndCheck)
    });

    test("Madrid Paris distance", done => {
        const airportsLoader = new AirportsLoader()

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

        airportsLoader.load(airportsAndCheck)
    });
})