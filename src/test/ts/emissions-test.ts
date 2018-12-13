import { Flight } from './../../main/ts/app/flights';
import { AirportsLoader } from './../../main/ts/app/airports-loader';
import { GPSCoordinate } from './../../main/ts/app/app';
import { Airport } from '../../main/ts/app/app';

describe("calc milleage for GPS coordinates", () => {

    test("Same location", done => {
        const airportsLoader = new AirportsLoader()

        const airportsAndCheck: (airportsMap: Map<String, Airport>) => void = airports => {
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

    test("Madrid Paris distance same altitude", done => {
        const airportsLoader = new AirportsLoader()

        const airportsAndCheck: (airportsMap: Map<String, Airport>) => void = airports => {
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