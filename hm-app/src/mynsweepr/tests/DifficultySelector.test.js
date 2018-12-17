import React from 'react';
import DifficultySelector from '../DifficultySelector';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('changes difficulty to 9 when Easy radio is checked', () => {
  let difficulty = null;
  const difficultyChanged = changeEvent => {
    difficulty = +changeEvent.target.value;
  };
  const component = shallow(
    <DifficultySelector
      difficulty={difficulty}
      width={0}
      height={0}
      difficultyChanged={difficultyChanged}
      widthChanged={null}
      heightChanged={null}
    />
  );
  component
    .find('input[value="9"]')
    .simulate('click', { target: { value: '9' } });
  expect(difficulty).toBe(9);
  console.log(component.prop('difficulty'));
});
