import { Airport } from '../src/main/ts/app/app';

describe("calc milleage for GPS coordinates", () => {
    let MAD_AIRPORT_GPS_LOCATION = {latitude: 40.492222222, longitude: -3.5716666667, altitude: 1}
    let CDG_AIRPORT_GPS_LOCATION = {latitude: 49.00972222, longitude: 2.54861111, altitude: 1};


    test("Same location", () => {
        let aLocation = new Airport(MAD_AIRPORT_GPS_LOCATION)
        expect(aLocation.distanceTo(MAD_AIRPORT_GPS_LOCATION)).toBe(0);
    });

    test("Madrid Paris distance same altitude", () => {
        let MAD = new Airport(MAD_AIRPORT_GPS_LOCATION)
        expect(MAD.distanceTo(CDG_AIRPORT_GPS_LOCATION)).toBeCloseTo(1062.4, 1);
    });

    test("Invalid excessive GPS coordinate", () => {
        let anAirport = new Airport(MAD_AIRPORT_GPS_LOCATION)
        const invalidGPSLocation = {latitude: 50000, longitude: 500000, altitude: 10000}
        expect(() => {
            anAirport.distanceTo(invalidGPSLocation)
        })
        .toThrowError("Invalid GPS coordinate");
    });

    test("Invalid too short GPS coordinate", () => {
        let anAirport = new Airport(MAD_AIRPORT_GPS_LOCATION)
        const invalidGPSLocation = {latitude: -80, longitude: -190, altitude: 10000}
        expect(() => {
            anAirport.distanceTo(invalidGPSLocation)
        })
        .toThrowError("Invalid GPS coordinate");
    });
})