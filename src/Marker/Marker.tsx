import React from 'react';

import mapmarker from '../Icons/map-marker-alt-solid.svg';
import car from '../Icons/car-solid.svg';

import InfoBox from './InfoBox/InfoBox';
import {
  CarImg,
  MarkerImg,
  MarkerImgUnavailable,
  MarkerInGroupStyled,
  MarkerStyled
} from './Marker.styles';

interface IOwnProps {
  lat: number;
  lng: number;
  inGroup: boolean;
  available: string;
  cardata: Array<{
    id: string;
    name: string;
    address: string;
    status: string;
    batteryLevelPct: number;
  }>;
  carid: string;
}

class Marker extends React.PureComponent<IOwnProps> {
  static defaultProps = {
    inGroup: false
  };

  render() {
    return (
      <>
        {this.props.inGroup ? (
          <MarkerInGroupStyled />
        ) : (
          <MarkerStyled>
            {this.props.available === 'AVAILABLE' ? (
              <MarkerImg src={mapmarker} />
            ) : (
              <MarkerImgUnavailable src={mapmarker} />
            )}
            <CarImg src={car} />
            {this.props.cardata.length > 0 &&
            this.props.cardata[0] !== undefined &&
            this.props.carid === this.props.cardata[0].id ? (
              <InfoBox data={this.props.cardata[0]} />
            ) : (
              ''
            )}
          </MarkerStyled>
        )}
      </>
    );
  }
}

export default Marker;
