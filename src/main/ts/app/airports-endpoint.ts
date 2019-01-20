import { Airport } from './app';
import { AirportService, AirportLoadCallback } from "./airports-service";

export class AirportsEndpointService implements AirportService {
    private airportsJSON = '[{"code":"MAD","altitude":610,"latitude":40.472,"longitude":-3.561}]'

    loadAirportsAsync(loadedAirports: AirportLoadCallback): void {
        let airportsMap = new Map<String, Airport>();

        let airportsList : AirportJSON[]= JSON.parse(this.getAirportsFromEndpoint())

        airportsList.map(airport => {
            airportsMap.set(airport.code, this.adapt(airport));
        });

        loadedAirports(airportsMap);
    }


    private getAirportsFromEndpoint(): string {
        return this.airportsJSON;
    }

    private adapt(airport: AirportJSON): Airport {
        return new Airport({ altitude: airport.altitude, longitude: airport.longitude, latitude: airport.latitude });
    }
}

interface AirportJSON {
    code: string
    altitude: number
    latitude: number
    longitude: number
}