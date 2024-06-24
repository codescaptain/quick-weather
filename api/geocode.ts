import axios from "axios";
const EXPO_PUBLIC_HOURLY_WEATHER_URL = process.env.EXPO_PUBLIC_HOURLY_WEATHER_URL
const EXPO_PUBLIC_LOCATION_URL = process.env.EXPO_PUBLIC_LOCATION_URL

export interface GeocodeHourlyResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  elevation: number;
  timezone_abbreviation: string;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily?: Daily;
  daily_units?: DailyUnits;

}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface Hourly {
  time: Array<string>;
  temperature_2m: Array<number>;
}

export interface Daily{
  temperature_2m_max: Array<number>;
  temperature_2m_min: Array<number>;
  weather_code: Array<string>;
}

export const getGeocodeHourly = async (): Promise<Array<GeocodeHourlyResponse>> => {
 const result = await axios.get(`${EXPO_PUBLIC_HOURLY_WEATHER_URL}`);
  return result.data;
} 

export const getWeatherByLocation = async (latitude: string, longitude: string): Promise<GeocodeHourlyResponse> => {
  const result = await axios.get(`${EXPO_PUBLIC_LOCATION_URL}&latitude=${latitude}&longitude=${longitude}`);
  return result.data;
}