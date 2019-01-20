export type GPSCoordinate = {latitude: number, longitude: number, altitude: number}

export type DistanceInKm = number

export interface GPSLocation {
    distanceTo(other: GPSCoordinate): DistanceInKm
}

export class Airport implements GPSLocation{
    location: GPSCoordinate

    constructor(location: GPSCoordinate) {
        this.location = location
    }

    public distanceTo(other: GPSCoordinate): DistanceInKm {
        
        if (this.isValidCoordinate(other)) {
            return distanceTwoLocations(this.location, other)
        }
        throw new Error('Invalid GPS coordinate');        
    }

    private isValidCoordinate(other: GPSCoordinate) {
        return (other.latitude < 90 && other.latitude > -90) &&
            (other.longitude < 180 && other.longitude > -180);
    }
}

function distanceTwoLocations(one:GPSCoordinate, other:GPSCoordinate) : DistanceInKm{
    let R = 6371; // earth's mean radius in km
    let dLat = (one.latitude-other.latitude) * (Math.PI/180);
    let dLon = (one.longitude-other.longitude) * (Math.PI/180);
    let latInRad = one.latitude * (Math.PI/180), otherLatInRad = other.latitude * (Math.PI/180);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(latInRad) * Math.cos(otherLatInRad) * Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
