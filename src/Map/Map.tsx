import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import Marker from '../Marker/Marker';
import ClusterMarker from '../MarkerGroup/MarkerGroup';
import { api } from '../Api';
import times from '../Icons/times-solid.svg';
import car from '../Icons/car-solid.svg';
import truck from '../Icons/truck-solid.svg';
import battery from '../Icons/car-battery-solid.svg';

import {
  MapWrapper,
  RangeInput,
  RangeWrapper,
  FiltersWrapper,
  FiltersItemWrapper,
  ExtendedInfo,
  Exit,
  CarItem,
  ItemWrapper,
  Popup
} from './Map.styles';
import { IOwnState, ICenter, IBounds } from './Map.types';

const MAP = {
  defaultZoom: 8,
  defaultCenter: { lat: 52.2104989994327, lng: 21.03950966723914 },
  options: {
    maxZoom: 19
  }
};

export class GoogleMap extends React.PureComponent<{}, IOwnState> {
  state: IOwnState = {
    mapOptions: {
      center: {
        lat: 52.2104989994327,
        lng: 21.03950966723914
      },
      zoom: MAP.defaultZoom,
      bounds: {
        nw: { lat: 1, lng: 1 },
        ne: { lat: 1, lng: 1 },
        sw: { lat: 1, lng: 1 },
        se: { lat: 1, lng: 1 }
      }
    },
    data: [],
    clusters: [],
    cardata: [],
    clickedData: [],
    batteryStatus: false,
    filters: {
      batteryLVL: 0,
      status: '',
      type: ''
    }
  };

  public componentDidMount = async () => {
    const data = await api
      .get('https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE')
      .then(response => {
        return response;
      });
    this.setState(
      {
        data: data.objects
      },
      () => this.createClusters()
    );
  };

  getClusters = () => {
    let { data } = this.state;

    data = data.map(point => ({
      ...point,
      lat: point.location.latitude,
      lng: point.location.longitude,
      carid: point.id
    }));

    if (this.state.filters.batteryLVL > 0) {
      data = data.filter(v => {
        return v.batteryLevelPct > this.state.filters.batteryLVL;
      });
    }

    if (this.state.filters.status !== '') {
      data = data.filter(v => {
        return v.status === this.state.filters.status;
      });
    }

    if (this.state.filters.type !== '') {
      data = data.filter(v => {
        return v.type === this.state.filters.type;
      });
    }

    const clusters = supercluster(data, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60
    });

    return clusters(this.state.mapOptions);
  };

  onMouseEnter = (key: string, carProp: { carid: string }) => {
    let car = this.state.data.find(v => v.id === carProp.carid);
    if (car) {
      this.setState({ cardata: [car] });
    }
  };

  onMouseLeave = () => {
    this.setState({ cardata: [] });
  };

  createClusters = () => {
    this.setState({
      clusters: this.getClusters().map(
        ({
          wx,
          wy,
          numPoints,
          points
        }: {
          wx: number;
          wy: number;
          numPoints: number;
          points: Array<{
            id: string;
          }>;
        }) => {
          return {
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points
          };
        }
      )
    });
  };

  handleMapChange = ({
    center,
    zoom,
    bounds
  }: {
    center: ICenter;
    zoom: number;
    bounds: IBounds;
  }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds
        }
      },
      () => {
        this.createClusters();
      }
    );
  };

  handleClick = (key: string, carProp: { carid: string }) => {
    let car = this.state.data.find(v => v.id === carProp.carid);
    if (car) {
      this.setState({ clickedData: [car] });
    }
  };
  handleExit = () => {
    this.setState({ clickedData: [] });
  };

  handleBattery = () => {
    this.setState((prevState: IOwnState) => ({
      batteryStatus: !prevState.batteryStatus
    }));
  };

  onChangeFilter = (
    type: string,
    value: string = '',
    e?: React.FormEvent<HTMLInputElement>
  ) => {
    switch (type) {
      case 'battery': {
        if (e && e.currentTarget && e.currentTarget.value) {
          let battery = Number(e.currentTarget.value);
          this.setState(
            (prevState: IOwnState) => ({
              filters: {
                ...prevState.filters,
                batteryLVL: battery
              }
            }),
            () => this.createClusters()
          );
        }
        break;
      }
      case 'type': {
        let type = value;
        this.setState(
          (prevState: IOwnState) => ({
            filters: {
              ...prevState.filters,
              type: prevState.filters.type !== type ? type : ''
            }
          }),
          () => this.createClusters()
        );
        break;
      }
      case 'status': {
        this.setState(
          (prevState: IOwnState) => ({
            filters: {
              ...prevState.filters
            }
          }),
          () => this.createClusters()
        );
        break;
      }
    }
  };

  render() {
    return (
      <>
        <MapWrapper>
          <GoogleMapReact
            defaultZoom={MAP.defaultZoom}
            defaultCenter={MAP.defaultCenter}
            options={MAP.options}
            onChange={this.handleMapChange}
            onChildMouseEnter={this.onMouseEnter}
            onChildMouseLeave={this.onMouseLeave}
            onChildClick={this.handleClick}
            yesIWantToUseGoogleMapApiInternals
            bootstrapURLKeys={{
              key: 'AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818'
            }}>
            {this.state.clusters.map(item => {
              if (item.numPoints === 1) {
                return (
                  <Marker
                    key={item.id}
                    lat={item.points[0].lat}
                    lng={item.points[0].lng}
                    carid={item.points[0].carid}
                    cardata={this.state.cardata}
                    available={item.points[0].status}
                  />
                );
              }

              return (
                <ClusterMarker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  points={item.points}
                />
              );
            })}
          </GoogleMapReact>
        </MapWrapper>
        {this.state.clickedData.length > 0 && this.state.clickedData[0] ? (
          <Popup>
            <ExtendedInfo>
              <h1>{this.state.clickedData[0].name}</h1>
              <p>
                Address:{' '}
                {this.state.clickedData[0].address
                  ? this.state.clickedData[0].address
                  : 'Brak informacji'}
              </p>
              <p>BatteryLVL: {this.state.clickedData[0].batteryLevelPct}/100</p>
              <p>Color: {this.state.clickedData[0].color}</p>
              <p>platesNumber: {this.state.clickedData[0].platesNumber}</p>
              <p>rangeKm: {this.state.clickedData[0].rangeKm}</p>
              <p>
                reservation:{' '}
                {this.state.clickedData[0].reservation
                  ? this.state.clickedData[0].reservation
                  : 'Brak informacji'}
              </p>
              <p>status: {this.state.clickedData[0].status}</p>
              <p>type: {this.state.clickedData[0].type}</p>
              <Exit onClick={this.handleExit}>
                <image xlinkHref={times} width="100%" height="100%" />
              </Exit>
            </ExtendedInfo>
          </Popup>
        ) : (
          <></>
        )}
        <FiltersWrapper>
          <ItemWrapper
            onClick={(e: React.FormEvent<HTMLDivElement>) => {
              this.onChangeFilter('type', 'CAR');
            }}>
            <FiltersItemWrapper
              className={this.state.filters.type === 'CAR' ? 'active' : ''}>
              <CarItem src={car} />
            </FiltersItemWrapper>
            <p>Samochody osobowe</p>
          </ItemWrapper>
          <ItemWrapper
            onClick={(e: React.FormEvent<HTMLDivElement>) => {
              this.onChangeFilter('type', 'TRUCK');
            }}>
            <FiltersItemWrapper
              className={this.state.filters.type === 'TRUCK' ? 'active' : ''}>
              <CarItem src={truck} />
            </FiltersItemWrapper>
            <p>Samochody ciężarowe</p>
          </ItemWrapper>
          <ItemWrapper
            onClick={() => {
              this.handleBattery();
            }}>
            <FiltersItemWrapper
              className={
                this.state.batteryStatus === true
                  ? 'activelist'
                  : this.state.filters.batteryLVL > 0
                  ? 'active'
                  : ''
              }>
              <CarItem src={battery} />
            </FiltersItemWrapper>
            <p>Poziom baterii</p>
            {this.state.batteryStatus === true ? (
              <RangeWrapper>
                <label style={{ color: 'white' }}>
                  Poziom baterii: {this.state.filters.batteryLVL}%
                </label>
                <RangeInput
                  type="range"
                  value={this.state.filters.batteryLVL}
                  onChange={e => this.onChangeFilter('battery', '', e)}
                />
              </RangeWrapper>
            ) : (
              ''
            )}
          </ItemWrapper>
        </FiltersWrapper>
      </>
    );
  }
}

export default GoogleMap;
