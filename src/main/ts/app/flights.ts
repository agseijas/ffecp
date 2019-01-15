import { Airport } from './app';

//https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft#Airlines

export type CO2GramsPerPaxPerFlight = number

export interface Pollutes {
    co2(): CO2GramsPerPaxPerFlight
}

export class Flight implements Pollutes{
    from: Airport
    to: Airport

    constructor(from: Airport, to: Airport) {
        this.from = from
        this.to = to
    }

    public co2(): CO2GramsPerPaxPerFlight {
        return co2EmissionsInGrams(this.from, this.to);
    }
}

function co2EmissionsInGrams(one: Airport, other: Airport) : number {
    const avgCO2EmissionsPerPassengerPerKmInGrams = 123
    return one.distanceTo(other.location) * avgCO2EmissionsPerPassengerPerKmInGrams
}