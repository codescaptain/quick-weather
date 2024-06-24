import axios from 'axios'

const GECODE_URL = process.env.EXPO_PUBLIC_GECODE_URL

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
  admin2: string;
}
