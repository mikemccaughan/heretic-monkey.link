// import {
//   difficultyChanged,
//   heightChanged,
//   widthChanged
// } from '../redux-modules/Mynsweepr/index';
import Mynsweepr from '../components/mynsweepr';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    //console.log('Mynsweepr: mapStateToProps', JSON.stringify(state));
    return Object.assign({}, state);
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mynsweepr);
