export type GPSCoordinate = {latitude: number, longitude: number, altitude: number}

export interface GPSLocation {
    distanceTo(other: GPSCoordinate): number
}

export class Airport implements GPSLocation{
    location: GPSCoordinate

    constructor(location: GPSCoordinate) {
        console.log(location)
        this.location = location
    }

    public distanceTo(other: GPSCoordinate): number {
        return distanceTwoLocations(this.location, other)
    }
}

function distanceTwoLocations(one:GPSCoordinate, other:GPSCoordinate) : number{
    let R = 6371; // earth's mean radius in km
    let dLat = (one.latitude-other.latitude) * (Math.PI/180);
    let dLon = (one.longitude-other.longitude) * (Math.PI/180);
    let latInRad = one.latitude * (Math.PI/180), otherLatInRad = other.latitude * (Math.PI/180);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(latInRad) * Math.cos(otherLatInRad) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
 }
