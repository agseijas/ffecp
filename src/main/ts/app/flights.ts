import { Airport } from './app';

//https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft#Airlines

export interface Pollutes {
    co2(other: Airport): number
}

export class Flight implements Pollutes{
    from: Airport
    to: Airport

    constructor(from: Airport, to: Airport) {
        this.from = from
        this.to = to
    }

    public co2(): number {
        return co2EmissionsInGrams(this.from, this.to);
    }
}

function co2EmissionsInGrams(one: Airport, other: Airport) : number {
    const avgCO2EmissionsPerPassengerPerKmInGrams = 123
    return one.distanceTo(other.location) * avgCO2EmissionsPerPassengerPerKmInGrams
}