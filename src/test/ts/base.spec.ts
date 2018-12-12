import { CitiesLocations } from './../../main/ts/app/app';
import { DistanceCalculator } from "../../main/ts/app/app"

describe("calc milleage for GPS coordinates", () => {
    const calculator = new DistanceCalculator()

    test("Same city", () => {
        const sameCity = { 
            one: {altitude: 1, latitude: 1, longitude: 1}, 
            other: {altitude: 1, latitude: 1, longitude: 1}
        }

        expect(calculator.getDistanceFor(sameCity)).toBe(0);
    });
})