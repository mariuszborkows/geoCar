export interface IBounds {
  nw: ICenter;
  ne: ICenter;
  sw: ICenter;
  se: ICenter;
}

export interface ICenter {
  lat: number;
  lng: number;
}

export interface IMapOptions {
  center: ICenter;
  bounds: IBounds;
  zoom: number;
}

export interface IOwnState {
  mapOptions: IMapOptions;
  data: IData[];
  clusters: IClusters[];
  cardata: IData[];
  clickedData: IData[];
  batteryStatus: boolean;
  filters: {
    batteryLVL: number;
    status: string;
    type: string;
  };
}

export interface IData {
  discriminator: string;
  platesNumber: string;
  sideNumber: string;
  color: string;
  type: string;
  picture: {
    id: string;
    name: string;
    extension?: string;
    contentType?: string;
  };
  rangeKm: number;
  batteryLevelPct: number;
  reservationEnd?: string;
  reservation: string;
  status: string;
  locationDescription?: string;
  address: string;
  mapColor: { rgb: string; alpha: number };
  promotion: null;
  id: string;
  name: string;
  description?: string;
  location: { latitude: number; longitude: number };
  metadata?: string;
}
export interface IClusters {
  lat: number;
  lng: number;
  numPoints: number;
  id: string;
  points: Array<{
    lat: number;
    lng: number;
    carid: string;
    status: string;
  }>;
}

// export default {
//   IClusters: IClusters,
//   IData,
//   IOwnState,
//   IMapOptions,
//   ICenter,
//   IBounds
// };
