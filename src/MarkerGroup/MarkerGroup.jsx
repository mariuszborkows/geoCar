import React from 'react';

import Marker from '../Marker/Marker';
import { Wrapper, MarkerCounter } from './MarkerGroup.styles';

class MultipleMarker extends React.PureComponent {
  state = {
    clusterFaceMarkers: this.props.points.slice(0, 2) || []
  };

  render() {
    console.log('points', this.props.points);
    return (
      <Wrapper length={this.props.points.length}>
        {this.state.clusterFaceMarkers.map(marker => (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            name={marker.id}
            inGroup
          />
        ))}
        {this.props.points.length > 2 && (
          <MarkerCounter>+{this.props.points.length - 2}</MarkerCounter>
        )}
      </Wrapper>
    );
  }
}

export default MultipleMarker;
