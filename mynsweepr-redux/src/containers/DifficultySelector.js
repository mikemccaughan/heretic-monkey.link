import {
  difficultyChanged,
  heightChanged,
  widthChanged
} from '../redux-modules/Mynsweepr/index';
import DifficultySelector from '../components/difficultySelector';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  //console.log('DifficultySelector: mapStateToProps: state: ', JSON.stringify(state));
  return { difficulty: state.difficulty, width: state.width, height: state.height };
};
const mapDispatchToProps = dispatch => {
  return {
    handleDifficultyChanged: event => dispatch(difficultyChanged(event.target.value)),
    handleHeightChanged: event => dispatch(heightChanged(+event.target.value)),
    handleWidthChanged: event => dispatch(widthChanged(+event.target.value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DifficultySelector);
