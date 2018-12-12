import { Flight } from '../../main/ts/app/flights';
import { Airport } from '../../main/ts/app/app';

describe("calc emissions", () => {
    let MAD_AIRPORT = new Airport({latitude: 40.492222222, longitude: -3.5716666667, altitude: 1})
    let CDG_AIRPORT = new Airport({latitude: 49.00972222, longitude: 2.54861111, altitude: 1});

    test("Same location emissions", () => {
        let flight = new Flight(MAD_AIRPORT, MAD_AIRPORT)
        expect(flight.co2()).toBe(0);
    });

    test("Madrid-Paris flight emissions by average emissions per passenger in CO2 grams", () => {
        let flight = new Flight(MAD_AIRPORT, CDG_AIRPORT)
        expect(flight.co2()).toBeCloseTo(130679.9, 1);
    });
})