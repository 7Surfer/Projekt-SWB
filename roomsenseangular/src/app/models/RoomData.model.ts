export interface IRoomData {
  deviceName: string;
  roomName: string;
  upperLimit: number;
  lowerLimit: number;
  //ts: number;
}

export interface RoomSettings{
  deviceId: string;
  roomName: string;
  lowerTempLimit: number;
  upperTempLimit: number;
  lowerHumiLimit: number;
  upperHumiLimit: number;
  message: boolean;
}

