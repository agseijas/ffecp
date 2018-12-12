import { Airport } from './app';

//https://en.wikipedia.org/wiki/Fuel_economy_in_aircraft#Airlines

export interface Pollutes {
    co2(other: Airport): number
}

const averageCO2EmissionsPassengerKmInGrams = 123

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
    return one.distanceTo(other.location) * averageCO2EmissionsPassengerKmInGrams
}