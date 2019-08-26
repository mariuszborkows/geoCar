import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { shallow } from 'enzyme';

import Map from './Map';

describe('App component', () => {
  let props: any;
  let mountedApp: any;
  const ContentBarMount = () => {
    if (!mountedApp) {
      mountedApp = shallow(<App {...props} />);
    }
    return mountedApp;
  };
  beforeEach(() => {
    props = {};
    mountedApp = undefined;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render plus Map component', () => {
    expect(
      ContentBarMount()
        .find(Map)
        .exists()
    ).toBe(true);
  });
});
