export interface SensorData {
  deviceId: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  _ts: number;
}

export interface Roomdata {
  deviceId: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  _ts: number;
  room: string;
}
