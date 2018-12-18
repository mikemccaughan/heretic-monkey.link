import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {};
  const enzymeWrapper = shallow(<App />);
  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('App', () => {
    it('should render itself', () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toBeDefined();
      expect(enzymeWrapper.find('Mynsweepr')).not.toBeNull();
    });
  });
});