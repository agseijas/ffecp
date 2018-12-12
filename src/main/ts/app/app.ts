export type Coordinate = {altitude: number, latitude: number, longitude: number}
export type CitiesLocations = {one: Coordinate, other: Coordinate}

export class DistanceCalculator {
    public getDistanceFor(locations : CitiesLocations): number {
        
        return 0
    }
}
