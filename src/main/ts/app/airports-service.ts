import { Airport } from './app';

export type AirportLoadCallback = (airportsMap: Map<String, Airport>) => void

export interface AirportService {
    loadAirportsAsync(loadedAirports: AirportLoadCallback): void
}

export type IATAAirport = {code: string, alt: string, lat: string, lon: string}