import { Airport } from './app';
import { AirportService, AirportLoadCallback } from "./airports-service";

export class AirportsEndpointService implements AirportService {
    
    loadAirportsAsync(loadedAirports: AirportLoadCallback): void {
        let airportsMap = new Map<String, Airport>();

        this.getAirportsFromEndpoint().then(airportsJSONList => {
            let airportsList : AirportJSON[]= JSON.parse(airportsJSONList)

            airportsList.map(airport => {
                airportsMap.set(airport.code, this.adapt(airport));
            });
    
            loadedAirports(airportsMap);
        })
    }

    private getAirportsFromEndpoint(): Promise<string> {
        return fetch('/airports').then(res => res.text());
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