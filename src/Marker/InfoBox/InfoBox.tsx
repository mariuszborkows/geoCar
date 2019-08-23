import React from 'react';
import { InfoTip } from './InfoBox.styles';

interface IOwnProps {
  data: {
    name: string;
    address: string;
    status: string;
    batteryLevelPct: number;
  };
}

interface IOwnState {
  elementHeight: number;
}

class InfoBox extends React.Component<IOwnProps, IOwnState> {
  state = {
    elementHeight: 0
  };
  private divRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (
      this.divRef &&
      this.divRef.current &&
      this.divRef.current.clientHeight
    ) {
      this.setState({ elementHeight: this.divRef.current.clientHeight });
    }
  }

  render() {
    return (
      <InfoTip
        ref={this.divRef}
        style={{ top: -this.state.elementHeight - 32 }}>
        <h1 style={{ fontSize: 14, paddingBottom: 0 }}>
          {this.props.data.name}
        </h1>
        <p>Address: {this.props.data.address}</p>
        <p>BatteryLVL: {this.props.data.batteryLevelPct}/100</p>
        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#ddd',
            width: '100%'
          }}>
          <div
            style={{
              backgroundColor:
                this.props.data.batteryLevelPct >= 60
                  ? '#0f0'
                  : this.props.data.batteryLevelPct >= 30
                  ? '#ff0'
                  : '#f00',
              width: this.props.data.batteryLevelPct + '%',
              height: 12
            }}
          />
        </div>
        <p>
          status:{' '}
          <span
            style={{
              color: this.props.data.status === 'AVAILABLE' ? '#0f0' : '#f00'
            }}>
            {this.props.data.status}
          </span>
        </p>
        <p>Click to view more info</p>
      </InfoTip>
    );
  }
}

export default InfoBox;
