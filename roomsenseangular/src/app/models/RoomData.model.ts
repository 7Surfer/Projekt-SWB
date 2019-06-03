export interface IRoomData {
  deviceName: string;
  roomName: string;
  upperLimit: number;
  lowerLimit: number;
  ts: number;
}

export class RoomData {
  constructor(
    public deviceName: string,
    public roomName: string,
    public lowerLimit: number,
    public upperLimit: number,
    public timestamp: number,
  ) {}
}
